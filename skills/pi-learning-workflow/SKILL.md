---
name: pi-learning-workflow
description: Establishes and operates a file-backed coding-learning workflow where the learner owns implementation. Use when initializing a learning project; working in a repository with docs/current_task.md, docs/progress.md, docs/hints.md, docs/verify.md, and docs/done/; adding a substantial task; giving incremental coding hints; verifying a milestone or whole task; safely adding generated learning documents to a Git worktree's .gitignore; archiving a completed, incomplete, failed, or unverified task; or preparing another task after safe archival.
license: MIT
compatibility: Requires filesystem access; command templates and package installation are Pi-specific, while the skill follows the Agent Skills format where practical.
metadata:
  package: pi-learning-workflow
  version: 0.1.0
---

# Pi Learning Workflow

Use project files—not session history—as durable state. Read [workflow operations](references/workflow-operations.md) for command-specific procedures and [project templates](references/project-templates.md) only when creating, repairing, or migrating workflow files.

## Permission boundaries

Distinguish these activities:

- **Explanation and review:** allowed when requested; inspect learner code and explain, diagnose, ask guiding questions, or provide pseudocode.
- **Workflow-document maintenance:** allowed when the invoked workflow requires it, but preserve useful content and never silently overwrite.
- **Verification:** inspect and run safe, relevant checks; do not change implementation to make checks pass.
- **Implementation changes:** source, tests, configuration, formatting, dependencies, and generated code require an explicit user request for code changes. A hint or verification request is not permission.

The learner writes implementation code by default. Give the smallest useful hint before stronger help. Do not provide finished implementation code unless explicitly requested.

## Required reading in a learning project

Before helping, read:

1. `docs/current_task.md`
2. `docs/progress.md`
3. `docs/verify.md`
4. only relevant portions of `docs/hints.md`
5. `docs/manifesto.md` when scope or workflow decisions are involved
6. relevant learner implementation for review, hints, or verification

Treat `docs/current_task.md` as the scope authority. Keep one coherent active task there; represent requested parts as milestones in that same file.

## Separate state judgments

Never conflate these states:

1. **Implementation-complete:** every required acceptance criterion appears satisfied based on inspected work.
2. **Verified:** applicable checks passed and evidence is recorded in `docs/progress.md`.
3. **Archived:** task history was preserved under `docs/done/` after an explicit archive request or informed confirmation.

Checked boxes and optimistic prose alone establish neither completion nor verification. An archive can be incomplete, unverified, or failed; never call such an archive completed.

## Safety invariants

- Inspect before writing. Never silently overwrite or delete workflow or legacy files.
- Ask one focused question when essential information, conflicts, intended task, or status is ambiguous.
- Never archive automatically. Never replace an active task merely because a new task was requested.
- Before replacing or archiving, evaluate completion and verification separately from evidence.
- If either is absent or uncertain, state exactly what evidence is missing, recommend `/verify-learning-step` when appropriate, and obtain informed confirmation that names the resulting status before changing files.
- If confirmation is declined, make no workflow-file changes.
- Preserve exact requirements, milestones, decisions, blockers, unfinished work, next action, and verification evidence in an archive.
- Use `docs/done/YYYY-MM-DD-task-slug.md`; sanitize the slug and add deterministic `-2`, `-3`, and so on if needed. Never overwrite.
- Create a new task after required archival only when the archive and related progress update succeeded.
- Update existing milestone/hint/history sections in place or append a uniquely dated entry; do not duplicate sections on repeated use.
- Do not claim migration, verification, archival, or file creation succeeded without inspecting the result.

## Verification discipline

Verify only the current milestone unless the user explicitly requests a named milestone or whole-task verification. Use temporary or isolated data where applicable; inspect exit status and relevant stdout/stderr. Report `passed`, `failed`, `partial`, or `blocked`, commands and evidence, and the smallest next action. Record completed verification accurately in `docs/progress.md`. Do not archive afterward.

## Migration discipline

Legacy files include `EXERCISE.md`, `MISSION.md`, `PROGRESS.md`, `hints.md`, and `VERIFY.md`. Do not move, rewrite, or delete them automatically. Inspect them, show a proposed source-to-destination mapping, identify conflicts, promise to preserve exact task requirements, and obtain approval before migration. Retain originals unless the user explicitly authorizes removal after checking the migrated result.

## Finish every operation

Summarize files created or changed, files deliberately left unchanged, evidence or commands used, current completion/verification/archive states when relevant, and the smallest next action. Do not imply that a declined or failed operation succeeded.
