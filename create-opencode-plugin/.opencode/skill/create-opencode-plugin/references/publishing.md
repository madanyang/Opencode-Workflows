# Publishing Plugins

> How to publish plugins to npm

## How OpenCode Manages Plugins

Users specify plugins in their config:

```jsonc
{
  "plugin": [
    "my-plugin@1.0.0", // Pinned version - won't auto-update
    "another-plugin", // No version = "latest" - updates on launch
  ],
}
```

**On launch, OpenCode:**

1. Runs `bun add --force` for each plugin
2. Caches pinned versions until user changes config
3. For unpinned plugins, resolves `latest` and caches actual version

## Publishing Checklist

1. **Package structure:**

   ```
   my-plugin/
   ├── src/
   │   └── index.ts      # Main plugin entry
   ├── package.json
   └── tsconfig.json
   ```

2. **package.json:**

   ```json
   {
     "name": "my-opencode-plugin",
     "version": "1.0.0",
     "type": "module",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "files": ["dist"],
     "scripts": {
       "build": "tsc",
       "prepublishOnly": "npm run build"
     },
     "dependencies": {
       "@opencode-ai/plugin": "latest"
     },
     "devDependencies": {
       "typescript": "^5.0.0"
     }
   }
   ```

3. **Publish:**
   ```bash
   npm publish
   ```

## Update Notifications for Pinned Versions

When users pin to a specific version (e.g., `my-plugin@1.0.0`), they won't see updates automatically.

Include an update checker that shows a toast when newer versions are available. See `references/update-notifications.md` for the full implementation.

## Common Mistakes

| Mistake                         | Fix                          |
| ------------------------------- | ---------------------------- |
| Missing `type: "module"`        | Add to package.json          |
| Not building before publish     | Add `prepublishOnly` script  |
| Wrong main entry                | Point to compiled JS, not TS |
| Missing @opencode-ai/plugin dep | Add as dependency            |
