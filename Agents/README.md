# Opencode Agent Templates

A focused catalog of agent prompts and orchestration patterns designed for Opencode
projects. Each agent lives in `.opencode/agent/` with YAML metadata and a
purpose-built instruction block.

## Architecture Overview

This directory showcases how to define reusable agents that complement command
workflows:

- **Agent Files**: Markdown specs with YAML frontmatter describing when to use the
  agent (`description`, `mode`, optional tool constraints)
- **Instruction Blocks**: Clear operational checklists tuned for LLM execution
- **Subagent Coordination**: Patterns for splitting complex work across
  specialists while staying context-efficient

## Available Agents

All four agents work best as **global agents** so every repository can invoke
them. Register each one in `~/.config/opencode/agent/` (Opencode’s global agent
folder) and reuse their instructions across projects. If a repository needs a
custom variant, place that tailored copy in `.opencode/agent/`.

| Agent | Description |
| --- | --- |
| `agent-architect` | Designs or refines Opencode agents using grounded research and concise prompts. Works best when refining agents created via `opencode agent create`. |
| `repo-navigator-creator` | Produces lean AGENTS.md navigation guides so LLMs can traverse repositories without context overload. |
| `subagent-orchestrator` | Dispatches specialized agents, partitions scopes, and manages parallel/sequential execution plans. |
| `openspec-orchestrator` | Enforces strict OpenSpec formatting, runs validations, and coordinates specialists across proposal, implementation, and archive workflows. Requires [OpenSpec](https://openspec.dev/) installed plus `openspec init` run in your repository. |

### Usage Flow
1. Reference the relevant agent file in `.opencode/agent/`.
2. Follow the YAML frontmatter to determine `mode` and key guardrails.
3. Execute the steps outlined in each body—these are tuned for LLM autonomy.

## Relationship to Commands

These agents pair with Opencode commands (see `Commands2Skills/README.md` for a
full template). Commands initiate workflows; agents provide deeper guidance,
research, or orchestration inside those workflows.

- Commands live in `.opencode/command/` and describe end-to-end tasks.
- Agents live in `.opencode/agent/` and provide specialized behavior when a task
  needs deeper reasoning, research, or coordination.

## File Structure

```
Agents/
├── README.md                  # This overview
└── .opencode/
    └── agent/
        ├── agent-architect.md
        ├── repo-navigator-creator.md
        ├── subagent-orchestrator.md
        └── openspec-orchestrator.md
```

## Adding New Agents

1. Run `opencode agent create` to scaffold the agent with proper identifiers and
   tool settings.
2. Place the generated file in `.opencode/agent/`.
3. Keep instructions lean: highlight guardrails, workflows, and key commands.
4. Update this README’s table with the agent name and description.

## Guidance for LLMs

- Always check the relevant agent file before acting; frontmatter describes when
  to use it.
- Respect tool constraints (e.g., read-only vs. write) defined in each agent.
- Keep reference material handy (e.g., OpenSpec docs for the OpenSpec orchestrator).
- When in doubt, ask clarifying questions instead of guessing.
