---
description: Refactor code (strict modularity, no slop, clean headers)
---

Refactor the following targets: $ARGUMENTS

**Context**: If no targets are specified above, identify and refactor files created within this session, or scan for worst offenders in the codebase - normally, it's the files with 250+ lines of code.

**Objective**: Modularise and clean up the code according to these strict standards.

### 1. File Structure & Modularity
- **Small Files**: Break large files into focused, single-purpose modules.
- **Barrel Exports**: Use `index.ts` files to cleanly expose public APIs from directories.
- **File Headers**: Every file MUST start with a non-verbose 2-3 sentence block comment explaining its specific purpose - no generic headers allowed.
  ```typescript
  /**
   * utils/formatting.ts
   * Provides currency and date formatting utilities for the billing dashboard.
   * Handles locale detection and fallback states.
   */
  ```

### 2. Code Hygiene ("No Slop")
- **Remove Emojis**: Delete ALL emojis from comments, strings, and UI text unless strictly necessary for the feature.
- **Concise Comments**: Remove "chatty" or redundant comments. Comment ONLY major sections or complex logic.
- **No Defensive Clutter**: Remove excessive `try/catch` or defensive checks (like `if (obj && obj.prop)`) if the data path is trusted or already validated.
- **Type Safety**: Strictly no `any` casts. Fix the types.

### 3. Core Principles
- **DRY**: If you see a pattern twice, abstract it.
- **Fail Fast**: Throw errors clearly; do not hide them.
- **No Console Logs**: Remove `console.log` entirely.

**Execution:**
1. Analyze the files against these rules.
2. Refactor to improve structure (splitting files if needed).
3. Clean up the code (remove slop, add headers, fix types).
