#!/usr/bin/env node

/**
 * Perplexica CLI - Simple command-line interface for Perplexica AI search
 * Solves timeout issues by handling long-running requests properly
 */

const { execSync } = require('child_process');

// Update this URL to match where your Perplexica instance is running
// Docker default: http://localhost:3000/api/search
const PERPLEXICA_URL = 'http://localhost:3000/api/search';

function curlRequest(request) {
  const curlCommand = `curl -X POST ${PERPLEXICA_URL} \\
    -H "Content-Type: application/json" \\
    -d '${JSON.stringify(request)}' \\
    --max-time 300 \\
    --silent \\
    --show-error`;

  try {
    const output = execSync(curlCommand, { 
      encoding: 'utf8',
      timeout: 300000 // 5 minutes in ms
    });
    
    return JSON.parse(output.toString());
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function decodeText(text) {
  return text
    .replace(/\\r/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\r/g, '')
    .trim();
}

function formatResponse(response) {
  console.log('\n📋 ANSWER:');
  
  const cleanMessage = decodeText(response.message);
  console.log(cleanMessage);
  
  if (response.sources && response.sources.length > 0) {
    console.log('\n📚 SOURCES:');
    response.sources.forEach((source, index) => {
      const title = decodeText(source.metadata.title || '');
      const url = decodeText(source.metadata.url || '');
      console.log(`\n${index + 1}. ${title}`);
      console.log(url);
    });
    
    console.log(`\n📊 Found ${response.sources.length} sources`);
  } else {
    console.log('\n📚 No sources found');
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🔍 Perplexica CLI - AI Search Tool

Usage: perplexica <query> [options]

Options:
  --mode <mode>     Focus mode (webSearch, academicSearch, writingAssistant, redditSearch, youtubeSearch, wolframAlphaSearch)
  --help            Show this help

Examples:
  perplexica "What are the latest model governance failures causing transformer hallucinations?"
  perplexica "How are European procurement teams enforcing AI compliance audits this quarter?" --mode academicSearch
  perplexica "Which declassified filings mention new witnesses in the Epstein investigation?"
    `);
    process.exit(0);
  }

  const request = {
    query: args[0],
    focusMode: 'webSearch',
    optimizationMode: 'balanced'
  };
  
  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--mode':
        if (args[i + 1]) {
          request.focusMode = args[i + 1];
          i++;
        }
        break;
      case '--help':
        parseArgs();
        break;
    }
  }
 
  request.optimizationMode = 'balanced';
  return request;
}


function main() {
  console.log('🔍 Searching Perplexica...');
  
  const request = parseArgs();
  console.log(`📝 Query: ${request.query}`);
  console.log(`🎯 Mode: ${request.focusMode}`);
  console.log(`⚡ Optimization: ${request.optimizationMode || 'speed'}`);
  
  const startTime = Date.now();
  const response = curlRequest(request);
  const endTime = Date.now();
  
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  console.log(`⏱️  Completed in ${duration}s`);
  
  formatResponse(response);
}

if (require.main === module) {
  main();
}