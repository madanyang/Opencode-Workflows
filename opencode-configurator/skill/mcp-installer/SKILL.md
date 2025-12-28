---
name: mcp-installer
description: Find, install, and configure Model Context Protocol (MCP) servers for OpenCode. Use when user asks about finding MCP servers, installing them, configuring OAuth, or troubleshooting MCP issues.
---

# MCP Installer

Find, install, and configure MCP servers for OpenCode.

## Workflow

### 1. Search for MCP Server

**Check local catalog first** (quick check for already-documented MCPs):
```bash
python3 ~/.config/opencode/skill/mcp-installer/scripts/list_mcps.py
```

**If not found locally, search online:**
- `websearch("MCP server for [capability]")`
- `webfetch("https://github.com/modelcontextprotocol/servers")`
- Check npm: `@modelcontextprotocol/server-*`
- Check the MCP spec repo: https://github.com/modelcontextprotocol

### 2. Read MCP Details

For relevant matches, read the full MCP file:

```
references/mcps/<name>.md
```

Contains installation config, setup, features, and links.

### 3. Configure

Add the MCP config to user's `opencode.json`.

### 4. Document New MCPs

If you discovered a new MCP server online, document it for future reference in `references/mcps/<name>.md` using the template below.

### 5. Setup (if needed)

- OAuth: Run `opencode mcp auth <server-name>`
- API keys: Set environment variables
- Other: Follow MCP-specific setup steps

## Configuration Basics

**Local MCP:**
```jsonc
{
  "mcp": {
    "name": {
      "type": "local",
      "command": ["npx", "-y", "@package/name"]
    }
  }
}
```

**Remote MCP:**
```jsonc
{
  "mcp": {
    "name": {
      "type": "remote",
      "url": "https://example.com/mcp"
    }
  }
}
```

## MCP Tool Management

MCPs expose tools. Control via `tools` section:

**Disable globally:**
```jsonc
{
  "tools": {
    "my-mcp": false,
    "my-mcp*": false
  }
}
```

**Enable per-agent:**
```jsonc
{
  "agent": {
    "my-agent": {
      "tools": {
        "my-mcp": true
      }
    }
  }
}
```

## OAuth

Remote MCPs with OAuth auto-authenticate:

```bash
opencode mcp auth <server-name>
```

Check status: `opencode mcp list`

## When to Read Reference Files

| You need...                                          | Read this file                  |
| ---------------------------------------------------- | ------------------------------- |
| All config options (local, remote, oauth, env vars) | `references/configuration.md`   |
| Common MCP server examples                          | `references/examples.md`        |
| Troubleshooting issues                              | `references/troubleshooting.md` |

**Note:** The local catalog (`list_mcps.py`) is a cache of discovered MCPs, not a complete list. Always search online if you don't find a match locally.

## Adding New MCPs

When discovering new MCP servers, document them:

**Location:** `references/mcps/<name>.md`

**Template:**
```markdown
---
name: mcp-name
url: https://github.com/org/repo
type: local|remote
auth: oauth|api-key|none
description: One-line description
tags: [tag1, tag2]
---
# Display Name

Brief description.

## Installation

\`\`\`jsonc
{
  "mcp": {
    "name": {
      "type": "remote",
      "url": "https://example.com/mcp"
    }
  }
}
\`\`\`

## Setup

Steps for auth, env vars, etc.

## Features

- Feature 1
- Feature 2

## Links

- [GitHub](url)
```

Then run: `python3 scripts/list_mcps.py` to verify.

## Frontmatter Fields

| Field    | Required | Purpose                              |
| -------- | ----------| ---------------------------------------- |
| `name`   | Yes      | MCP identifier (key in config)           |
| `url`    | No       | Source URL                               |
| `type`   | Yes      | `local` or `remote`                      |
| `auth`   | Yes      | `oauth`, `api-key`, or `none`            |
| `description` | Yes   | One-liner for catalog                    |
| `tags`   | No       | Array of category tags                    |
