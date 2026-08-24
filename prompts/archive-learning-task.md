---
description: Safely archive the active task with separate completion and verification status
argument-hint: "[custom slug or archival note]"
---
Load and follow the `pi-learning-workflow` skill, especially its **Archive a task** procedure and shared completion/verification check.

Inspect workflow files, implementation, and evidence. Determine implementation-complete and verified separately. This invocation is an explicit archive request only when the active task and state are unambiguous. If completion or verification is missing, failed, or uncertain, explain exactly why, recommend `/verify-learning-step`, and obtain informed confirmation naming the archive's incomplete/unverified/failed status before changing files. Never overwrite history, equate archived with completed, or create a new task automatically.

Optional sanitized slug or note: `${ARGUMENTS:-none}`
