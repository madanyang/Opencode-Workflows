# Create OpenCode Plugin

> AI-assisted plugin development for OpenCode

This skill enables the AI assistant to help you create plugins for OpenCode using the `@opencode-ai/plugin` SDK. Simply describe what you want your plugin to do, and the assistant will guide you through the entire process—from design to testing to publishing.

## What You Can Build

| Capability             | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| **Custom Tools**       | Add new tools the LLM can use during conversations                    |
| **Event Reactions**    | React to file edits, session completion, errors, and 35+ other events |
| **Tool Interception**  | Intercept, modify, or block tool calls before/after execution         |
| **LLM Parameters**     | Modify temperature, topP, topK, and other model parameters            |
| **Custom Auth**        | Implement custom authentication flows for AI providers                |
| **Session Compaction** | Customize how long conversations are summarized                       |
| **UI Notifications**   | Display toast popups and inline status messages                       |

## Example Use Cases

- **Code Quality Guard** — Block file writes that don't pass linting
- **Cost Tracker** — Monitor and display token usage per session
- **Auto-Formatter** — Format files automatically after edits
- **Custom Search** — Add a tool that searches your internal documentation
- **Audit Logger** — Log all tool executions to a file
- **Model Tuner** — Adjust temperature based on task type

## How It Works

1. **Describe your idea** — Tell the assistant what you want your plugin to do
2. **Feasibility check** — The assistant validates if it's achievable with the plugin API
3. **Guided implementation** — Step-by-step code generation with accurate SDK usage
4. **Testing** — Instructions to test your plugin locally
5. **Publishing** — Optional npm publishing for sharing with others

## Plugin Locations

| Scope   | Location                         | Use Case                                 |
| ------- | -------------------------------- | ---------------------------------------- |
| Project | `.opencode/plugin/*.ts`          | Team-shared, repository-specific plugins |
| Global  | `~/.config/opencode/plugin/*.ts` | Personal plugins across all projects     |

## Available Hooks

| Hook                   | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `event`                | React to 35+ system events (file edits, session status, etc.) |
| `tool`                 | Register custom tools with Zod schema validation              |
| `tool.execute.before`  | Intercept/modify/block tool calls before execution            |
| `tool.execute.after`   | Process tool results after execution                          |
| `chat.message`         | Modify user messages before sending                           |
| `chat.params`          | Adjust LLM parameters (temperature, topP, topK)               |
| `permission.ask`       | Auto-approve or deny permission requests                      |
| `auth`                 | Custom authentication for providers                           |
| `config`               | Access and validate configuration                             |
| `experimental.compact` | Customize session compaction behavior                         |

## What's Included

This package includes:

| Component   | Path                                      | Purpose                              |
| ----------- | ----------------------------------------- | ------------------------------------ |
| **Skill**   | `.opencode/skill/create-opencode-plugin/` | Reference docs and workflow          |
| **Command** | `.opencode/command/create-plugin.md`      | `/create-plugin` slash command       |
| **Agent**   | `.opencode/agent/plugin-creator.md`       | Specialized plugin development agent |

The skill provides comprehensive, auto-generated reference documentation:

- **Hook signatures** — Accurate TypeScript interfaces for all hooks
- **Event types** — All 35 event types with their properties
- **Tool patterns** — Zod schema examples for custom tools
- **UI feedback** — Toast and inline notification APIs
- **Complete examples** — Working plugin templates
- **Testing guide** — Local development workflow
- **Publishing guide** — npm distribution steps

## Quick Example

```typescript
import type { Plugin } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async ({ client, $ }) => {
  return {
    // React to file edits
    event: async ({ event }) => {
      if (event.type === "file.edited") {
        console.log(`File edited: ${event.properties.file}`)
      }
    },

    // Add a custom tool
    tool: {
      greet: tool({
        description: "Greet someone by name",
        args: tool.schema({ name: z.string() }),
        execute: async ({ args }) => `Hello, ${args.name}!`,
      }),
    },

    // Block dangerous operations
    "tool.execute.before": async (input, output) => {
      if (input.tool === "bash" && output.args.command.includes("rm -rf")) {
        throw new Error("Blocked: dangerous command")
      }
    },
  }
}
```

## Getting Started

Use the `/create-plugin` command to kick off the process:

```
/create-plugin a tool that searches my docs folder

/create-plugin block any bash commands containing rm -rf

/create-plugin log all file edits to a JSON file
```

Or just ask the assistant directly:

> "Create a plugin that logs all file edits to a file"

The assistant will handle the rest.

---

_This skill uses auto-generated API references extracted directly from the OpenCode SDK source code, ensuring accuracy and up-to-date documentation._
