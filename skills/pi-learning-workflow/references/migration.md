# Legacy project migration

Use only when the learner explicitly requests migration or approves a concrete proposal. Installing/updating the package, initializing a project, asking for a recap, or asking for help is not migration approval. Migration does not edit learner implementation.

## Recognize legacy workflows

Inspect likely sources, including the package's former layout (`docs/current_task.md`, `docs/progress.md`, `docs/hints.md`, `docs/verify.md`, `docs/manifesto.md`, `docs/done/`) and project-specific files such as `PLAN.md`, `PROGRESS.md`, `LEARNING.md`, `EXERCISE.md`, `MISSION.md`, `VERIFY.md`, and `hints.md`. Also inspect `AGENTS.md`, existing `.learning/`, Git status, and existing ignore rules.

If both legacy and new tracker files exist, treat this as a conflict. Do not create another tracker, overwrite a destination, or choose the authoritative source silently.

## Procedure

1. **Inspect read-only.** Identify exact files, dirty/untracked state, active work, completed/history material, verification evidence, stale instructions, and contradictory scope/status. Do not run project checks unless separately requested.
2. **Propose a concrete mapping.** List source files and proposed destinations/roles, issues/goals proposed, proposed focus (or explicitly unknown), facts to retain as history, unresolved conflicts, intended `AGENTS.md` and `.gitignore` changes, and a rollback plan. Distinguish facts from assumptions. Ask for approval of this specific plan before writing.
3. **Protect sources.** Preserve originals byte-for-byte. Git history is not sufficient backup for untracked or dirty files. Do not commit, stash, delete, rename, or untrack files. Do not overwrite existing destinations. Where a staging/snapshot is needed, obtain approval and use a unique non-overwriting location.
4. **Migrate only durable tracker facts.** Preserve task intent, requirements, acceptance criteria, unresolved work, meaningful decisions/blockers, and relevant verification evidence. Do not turn every completed phase, old hint, or conversation into a new issue. Link substantial learning material as optional reference rather than required reading.
5. **Preserve provenance.** Old checkboxes and optimistic statements are legacy-reported status, not newly verified. Keep failed/partial checks and their context. Verification results apply only to the code state they actually inspected. Do not claim a migration itself verified implementation.
6. **Resolve only essential ambiguity.** Ask focused questions about current focus or contradictory scope when necessary; unknown can remain unknown. Do not guess which unchecked issue is current. Do not silently make the newest document authoritative.
7. **Stage and validate.** Create the proposed `.learning/` tracker without activating it yet. Validate unique IDs, links, preservation of requirements/evidence, status provenance, and absence of duplicate active focus. Re-read sources and outputs. If validation fails, leave legacy entry points usable and explain what needs attention.
8. **Activate only after validation.** With the approved plan, update only the learning-workflow portion of `AGENTS.md`; preserve unrelated language/tooling instructions. Add a legacy-reference manifest to `.learning/index.md`. Do not edit or delete legacy documents. Make any required `.gitignore` changes append-only and idempotent, explaining tracked-file behavior.
9. **Report and stop.** List created/changed files, unchanged originals, unknowns, current focus/status provenance, and rollback steps. Do not remove legacy files unless the learner separately approves cleanup after reviewing the migrated tracker.

If interrupted, do not assume the migration completed. On retry, inspect the manifest, source hashes if recorded, and existing outputs; explain partial state and propose a safe continuation. Never duplicate IDs or overwrite files to force consistency.

## Mapping guidance

| Legacy material | Suggested new role |
| --- | --- |
| Current task / exercise / mission | One started issue, after confirming scope and current focus |
| Plan with completed phases | Legacy reference; create issues only for selected unfinished outcomes |
| Progress document | Source for reported milestones, blockers, decisions, and candidate focus; reconcile conflicts |
| Verify plan/results | Move applicable safe checks and evidence to relevant issue, retaining provenance |
| Hints/learning journal | Optional linked reference; do not import every hint as active workflow state |
| Archived task directory | Legacy history link; do not bulk-convert to new issues |
| Existing `AGENTS.md` | Preserve unrelated instructions; replace only obsolete learning-workflow section with approval |
| Existing `.gitignore` | Append only missing tracker rules; do not untrack existing files |

## Example: ytunes-go-tui

A safe proposal would keep `PLAN.md`, `PROGRESS.md`, `LEARNING.md`, and `RELEASE.md` intact. The release runbook remains operational documentation, not a tracker issue. Completed phases should be linked as history, not rewritten into dozens of tickets.

Potential backlog issues include Homebrew distribution, Windows support, YouTube playback reliability, persistent mpv sessions, and reconciling release-automation status. Do not infer focus from list order. In particular, `PROGRESS.md` leaves release automation unchecked while describing configuration already present; establish remaining acceptance criteria before resolving it. Preserve phase numbering/theme/IPC/release-order conflicts as historical context, and do not copy stale exclusions into current instructions. Keep existing long walkthroughs optional, not required reading.

This example is a migration proposal only. Do not access or modify that project as part of a generic package update.
