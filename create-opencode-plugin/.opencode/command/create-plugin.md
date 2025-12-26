---
description: Create an OpenCode plugin from a description
---

Load the `create-opencode-plugin` skill and use it to create a plugin based on the user's requirements.

## User's Plugin Idea

$ARGUMENTS

## Instructions

1. Follow the skill's procedure exactly - start with Step 1 (verify SDK reference)
2. Validate feasibility before implementing
3. Guide the user through design decisions if the idea is ambiguous
4. Create the plugin file in the correct location:
   - **Project plugins**: `.opencode/plugin/<plugin-name>/index.ts`
   - **Global plugins**: `~/.config/opencode/plugin/<plugin-name>/index.ts`
     The plugin file MUST be inside a subdirectory named after the plugin.
5. Provide testing instructions when complete
