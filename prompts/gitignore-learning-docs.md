---
description: Safely add generated learning-tracker paths to the repository .gitignore
---
Load and follow the `pi-learning-workflow` skill, especially **Ignore generated tracker files**.

Confirm the current directory is in a Git worktree and target its root `.gitignore`. Inspect existing rules and whether `AGENTS.md` is generated/owned by this workflow. Append only missing root-anchored entries for `/.learning/` and, only when appropriate, `/AGENTS.md`. Preserve unrelated content and deliberate version-control choices. Never untrack existing files; do not run `git add`. Re-read and report changes. If ownership or intent is ambiguous, ask before changing rules.
