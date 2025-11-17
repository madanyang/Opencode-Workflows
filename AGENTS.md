# AGENTS.md

This file provides guidance to Opencode agents when working with code in this repository.

## Repository Overview

This is the **Opencode Workflows** repository - a collection of Opencode-based command templates and workflow patterns for building sophisticated command-based projects. The repository contains multiple workflow examples and templates that demonstrate different approaches to command architecture and tool integration.

## Current Workflows

### Commands2Skills Template
A universal template for creating Opencode-based projects with structured commands and tool integration. Demonstrates a 4-part architecture:
- **Command Files**: Workflow templates with YAML frontmatter and structured execution
- **External Tools**: JavaScript utilities (calculate.js) showing CLI integration patterns
- **CLI Integration Layer**: Standard patterns for invoking external tools
- **Documentation System**: Automated maintenance via specialized agents

### Agent Templates Catalog
A focused collection of reusable agent prompts and orchestration patterns:
- **agent-architect**: Designs or refines Opencode agents using grounded research
- **repo-navigator-creator**: Produces lean AGENTS.md navigation guides
- **subagent-orchestrator**: Dispatches specialized agents and manages execution plans

Agents are designed for global installation in `~/.config/opencode/agent/` for reuse across projects.


### AI Research Tools
- `Scripts/perplexica-cli.js` - External tool for AI search integration with proper timeout handling
- Demonstrates integration with external AI services and APIs

## Architecture Patterns

### Command Structure
Commands follow Opencode's built-in `/commands` patterns (see opencode.ai/docs/commands):
- YAML frontmatter with descriptions
- Arguments section explaining $ARGUMENTS handling
- Step-by-step execution instructions
- Integration with external utilities

### Tool Integration
Commands can integrate with various external tools:
- **Script files**: JavaScript, Python, Bash executables
- **Bash tools**: System utilities, package managers, development tools
- **API endpoints**: Any curlable REST APIs or webhooks
- **Natural language workflows**: Pure LLM-driven processes

### Agent Structure
Agents follow Opencode's agent patterns with YAML frontmatter:
- **Description**: Clear guidance on when to use each agent
- **Mode**: Operation mode and tool constraints (read-only vs write)
- **Instruction Blocks**: Agent-optimized checklists and workflows
- **Global Installation**: Designed for reuse across projects via `~/.config/opencode/agent/`

### Configuration System
- `example-opencode.json` templates for Opencode configuration
- References to `AGENTS.md` and `COMMANDS.md` in instructions arrays
- `package.json` in `.opencode/` for Opencode plugin dependencies
- Follows Opencode schema standards

## Model Requirements

COMMANDS.md is injected at session start, requiring models with strong:
- **Context Management**: Maintaining COMMANDS.md throughout session
- **Instruction Following**: Precise execution of multi-step workflows
- **Agentic Capabilities**: Understanding when/how to use available commands

**Tested Models**: GPT-5.1 and GPT-5.1 Codex (excellent), GLM-4.6 (erratic behavior)

## Repository Structure

```
Commands2Skills/              # Template for command-based projects
├── COMMANDS.md              # Command index and agent usage instructions
├── example-opencode.json   # Template configuration
├── calculate.js            # Example tool integration
└── .opencode/
    ├── command/
    │   ├── explore.md       # Repository exploration workflow
    │   └── calculate.md     # Mathematical calculation workflow
    └── agent/
        └── commands-md-updater.md  # Documentation maintenance

Agents/                      # Agent templates catalog
├── README.md               # Agent overview and usage guidance
└── .opencode/
    └── agent/
        ├── agent-architect.md           # Agent design/refinement
        ├── repo-navigator-creator.md   # AGENTS.md generation
        ├── subagent-orchestrator.md    # Multi-agent coordination
        └── openspec-orchestrator.md    # OpenSpec workflow enforcement

Commands/                    # Additional command examples
└── .opencode/
    └── command/
        └── howto.md        # How-to command template

Scripts/                     # External utility tools
└── perplexica-cli.js       # AI search integration tool
```

## Working with This Repository

### For Template Usage
1. Review available workflow templates in Commands2Skills/, Agents/, and Commands/
2. Copy template elements selectively for your projects
3. Create your own `opencode.json` based on examples
4. Adapt commands and tools to specific needs
5. Install desired agents globally in `~/.config/opencode/agent/` for reuse across projects

### For Agent Usage
- Agents are designed for global installation but can be copied to project-specific `.opencode/agent/` directories
- Check YAML frontmatter to understand when to use each agent and any tool constraints
- Agents complement commands by providing specialized reasoning, research, or coordination
- Reference the relevant agent file before acting to respect mode and tool constraints

### For Workflow Development
- Commands follow Opencode `/commands` rules and patterns
- External tools should handle errors gracefully
- Documentation maintenance via specialized agents
- Model compatibility considerations for context management

## Future Development

This repository is designed to expand with additional workflow templates and patterns. Future workflows may include:
- Different command architectures and integration patterns
- Additional external tool integrations
- Alternative documentation systems
- Enhanced model compatibility patterns
- More specialized agent templates for different domains

## Key Insights

- This is a **workflow repository**, not a traditional application - no build/test/lint commands
- Focus on **reusable patterns** and **template architectures**
- Commands follow **Opencode standards** for compatibility
- Context injection currently limited to session-start (future enhancement possible)