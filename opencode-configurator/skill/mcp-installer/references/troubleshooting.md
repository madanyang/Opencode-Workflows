# Troubleshooting

## MCP Not Appearing

- Check `"enabled": true` in MCP config
- Check not disabled in `"tools"` section
- Test remote URL: `curl https://mcp.example.com/mcp`
- Test local command: `npx -y @package/name`

## Auth Failures

```bash
opencode mcp list
opencode mcp debug server-name
opencode mcp logout server-name
opencode mcp auth server-name
```

## OAuth Issues

- Verify server supports RFC 7591
- Use pre-registered OAuth if auto fails
- Check browser console for errors
- Clear tokens: `rm ~/.local/share/opencode/mcp-auth.json`

## Context Limits

MCPs add to context. Solutions:

- Disable unused: `"tools": { "my-mcp": false }`
- Per-agent enable: `agent.my-agent.tools`
- Use lightweight alternatives (gh_grep vs github)

## Env Variables

```bash
echo $MY_VAR  # Check if set
export MY_VAR=value  # Set in shell
```

Or add to `.env` file in project root.

## Local Command Issues

```bash
which npx  # Check in PATH
npx -y @package/name  # Test manually
```

Use absolute paths if needed.

## Remote Connection

```bash
curl https://mcp.example.com/mcp  # Test URL
```

Increase timeout if slow:
```jsonc
{
  "timeout": 30000
}
```
