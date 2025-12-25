# Publishing Plugins

> How to publish plugins to npm

## How OpenCode Manages Plugins

**Users do NOT need to run `npm install`** - OpenCode automatically installs plugin dependencies at runtime.

Users simply add the plugin name to their config:

```jsonc
{
  "plugin": [
    "my-plugin@1.0.0", // Pinned version - won't auto-update
    "another-plugin", // No version = "latest" - updates on launch
  ],
}
```

**On launch, OpenCode:**

1. Runs `bun add --force` for each plugin (auto-installs)
2. Caches pinned versions until user changes config
3. For unpinned plugins, resolves `latest` and caches actual version

This means your README should NOT include `npm install` instructions - just tell users to add the plugin to their config.

## Publishing Checklist

1. **Package structure:**

   ```
   my-plugin/
   ├── src/
   │   └── index.ts          # Main plugin entry
   ├── dist/                  # Built output (gitignored)
   ├── package.json
   ├── tsconfig.json
   ├── README.md
   ├── LICENSE
   ├── example-opencode.json  # Example config for users
   ├── .gitignore
   └── .npmignore
   ```

2. **package.json:**

   ```json
   {
     "name": "my-opencode-plugin",
     "version": "1.0.0",
     "type": "module",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "files": ["dist", "README.md", "LICENSE"],
     "peerDependencies": {
       "@opencode-ai/plugin": "^1.0.0"
     },
     "devDependencies": {
       "@opencode-ai/plugin": "^1.0.0",
       "@types/bun": "^1.2.0",
       "@types/node": "^22.0.0",
       "typescript": "^5.7.0"
     },
     "scripts": {
       "clean": "rm -rf dist",
       "build": "npm run clean && tsc",
       "prepublishOnly": "npm run build"
     }
   }
   ```

   Note: Use `peerDependencies` for `@opencode-ai/plugin` - OpenCode provides this at runtime.

3. **example-opencode.json:**

   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "plugin": ["my-opencode-plugin"]
   }
   ```

4. **README.md Installation Section:**

   ```markdown
   ## Installation

   Add to your `opencode.json`:

   \`\`\`json
   {
   "plugin": ["my-opencode-plugin"]
   }
   \`\`\`

   OpenCode automatically installs plugin dependencies at runtime.
   ```

5. **Publish:**
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
