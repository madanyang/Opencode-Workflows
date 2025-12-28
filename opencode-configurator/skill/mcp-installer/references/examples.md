# Common MCP Servers

## Context7

Docs search. Requires API key.

```jsonc
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}"
      }
    }
  }
}
```

## Grep (gh_grep)

GitHub code search. No auth.

```jsonc
{
  "mcp": {
    "gh_grep": {
      "type": "remote",
      "url": "https://mcp.grep.app"
    }
  }
}
```

## Sentry

Error tracking. OAuth.

```jsonc
{
  "mcp": {
    "sentry": {
      "type": "remote",
      "url": "https://mcp.sentry.dev/mcp",
      "oauth": {}
    }
  }
}
```

Then: `opencode mcp auth sentry`

## Filesystem

Local file access.

```jsonc
{
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/allowed/path"
      ]
    }
  }
}
```

## GitHub

GitHub API. High context usage.

```jsonc
{
  "mcp": {
    "github": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
      "environment": {
        "GITHUB_TOKEN": "{env:GITHUB_TOKEN}"
      }
    }
  }
}
```

Use per-agent config to manage context.

## Finding More

- https://github.com/modelcontextprotocol/servers
- `@modelcontextprotocol/server-*` on npm
- `references/mcps/*.md` for documented servers
