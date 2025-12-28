# MCP Configuration Reference

## Config Structure

```jsonc
{
  "mcp": {
    "mcp-name": {
      // config here
    }
  }
}
```

## Local MCP

```jsonc
{
  "type": "local",
  "command": ["npx", "-y", "@package/name", "args"],
  "environment": {
    "VAR": "{env:VAR}"
  },
  "enabled": true,
  "timeout": 5000
}
```

## Remote MCP

```jsonc
{
  "type": "remote",
  "url": "https://example.com/mcp",
  "headers": {
    "Authorization": "Bearer {env:API_KEY}"
  },
  "oauth": {},
  "enabled": true,
  "timeout": 5000
}
```

## OAuth

**Automatic** (most servers):
```bash
opencode mcp auth server-name
```

**Pre-registered**:
```jsonc
{
  "oauth": {
    "clientId": "{env:CLIENT_ID}",
    "clientSecret": "{env:CLIENT_SECRET}",
    "scope": "tools:read"
  }
}
```

**Disable**:
```jsonc
{
  "oauth": false
}
```

## Tool Management

```jsonc
{
  "tools": {
    "my-mcp": false,
    "my-mcp*": false
  },
  "agent": {
    "my-agent": {
      "tools": {
        "my-mcp": true
      }
    }
  }
}
```

## Environment Variables

Use `{env:VAR_NAME}` in config. Set in shell:

```bash
export VAR_NAME=value
```

Or in `.env` file in project root.
