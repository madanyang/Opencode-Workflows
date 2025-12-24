#!/usr/bin/env node

/**
 * Simple Calculator CLI - Basic arithmetic operations
 * Demonstrates how Opencode commands can invoke small utility tools
 */

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🧮 Calculator CLI - Basic arithmetic operations

Usage: calculate <expression> [options]

Examples:
  calculate "2 + 3"
  calculate "10 * 5 - 3"
  calculate "15 / 3"
  calculate "2 ^ 8"     (power)
  calculate "sqrt(16)"  (square root)
  calculate "log(100)"  (logarithm base 10)

Supported operations: +, -, *, /, ^, sqrt(), log(), sin(), cos(), tan()
  `);
    process.exit(0);
  }

  return args.join(' ');
}

function safeEvaluate(expression) {
  // Remove spaces and convert to lowercase
  expr = expression.replace(/\s/g, '').toLowerCase();

  // Replace mathematical functions
  expr = expr.replace(/sqrt/g, 'Math.sqrt');
  expr = expr.replace(/log/g, 'Math.log10');
  expr = expr.replace(/sin/g, 'Math.sin');
  expr = expr.replace(/cos/g, 'Math.cos');
  expr = expr.replace(/tan/g, 'Math.tan');
  expr = expr.replace(/pi/g, 'Math.PI');
  expr = expr.replace(/e/g, 'Math.E');

  // Replace power operator ^ with **
  expr = expr.replace(/\^/g, '**');

  try {
    // Use Function constructor for safer evaluation than eval()
    const result = new Function('return ' + expr)();
    return result;
  } catch (error) {
    throw new Error(`Invalid expression: ${expression}`);
  }
}

function formatResult(expression, result) {
  console.log(`📝 Expression: ${expression}`);

  if (typeof result === 'number') {
    if (Number.isInteger(result)) {
      console.log(`✅ Result: ${result}`);
    } else {
      console.log(`✅ Result: ${result.toFixed(4)}`);
    }
  } else {
    console.log(`✅ Result: ${result}`);
  }

  // Show additional info for certain operations
  if (expression.includes('sqrt') && result > 0) {
    console.log(`💡 Square root of ${Math.pow(result, 2).toFixed(0)} = ${result.toFixed(4)}`);
  }

  if (expression.includes('^')) {
    const base = expression.match(/(\d+\.?\d*)\s*\^/);
    if (base) {
      console.log(`💡 ${base[1]} raised to power = ${result.toFixed(4)}`);
    }
  }
}

function main() {
  const expression = parseArgs();

  if (!expression) {
    process.exit(1);
  }

  try {
    const result = safeEvaluate(expression);
    formatResult(expression, result);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}