---
description: Add one substantial learning task without overwriting or prematurely discarding the active task
argument-hint: "[goal, language, requirements, or constraints]"
---
Load and follow the `pi-learning-workflow` skill, especially its **Add a new task** procedure and shared completion/verification check.

Safely define the requested task in the current learning project. Keep one coherent goal and all requested parts as milestones in `docs/current_task.md`. Never overwrite an active task. When an active task is incomplete, unverified, failed, or ambiguous, you MUST end with one focused informed-confirmation question asking whether to archive it with the exact applicable status and then create the requested task; recommending completion first is not a substitute for asking. Until the user answers yes, change no workflow files. If prerequisite archival is declined or unsuccessful, do not create the new task. Do not generate implementation code.

Requested task: `${ARGUMENTS:-Not supplied; inspect the workflow and ask for essential task details.}`
