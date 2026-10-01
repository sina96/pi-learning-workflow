# Project templates

Keep the tracker small. Adapt only sections needed for this project; do not generate empty boilerplate. Inspect before writing and preserve existing project instructions.

## `AGENTS.md` addition

Add this section without replacing unrelated instructions:

```markdown
## Learning workflow

The learner owns implementation. Do not edit source, tests, configuration, dependencies, formatting, or generated implementation unless explicitly asked. Offer hints, explanations, walkthroughs, review, and verification on request. A request for detailed teaching is not permission to implement.

The learning tracker lives in `.learning/index.md`. Do not recap, inspect, run checks, or update it automatically when starting a session. When asked to resume, recap recorded state and distinguish it from fresh inspection. Read only the index, relevant issue, and requested/relevant project files.

Capture ideas without changing focus. Clarify scope, learning focus, and acceptance criteria before starting an issue. Ask before switching from unfinished focused work: pause it and switch, or queue the new issue and keep focus. Save only meaningful milestones, blockers, and decisions; label learner-reported progress separately from agent-verified evidence.

Verification does not edit implementation. Record evidence and limitations; ask before closing an issue. Keep one current focus and preserve unfinished work.
```

## `.learning/index.md`

```markdown
# Learning tracker

Schema: 1
Focus: none

## Goals

## Issues

## Legacy references

```

List IDs, short titles, and relative links only. Do not duplicate issue status or evidence here; each issue file remains its status authority. Goal documents are optional; a standalone issue does not require one.

Issue files live at `.learning/issues/Tnnn.md`; optional goals live at `.learning/goals/Gnnn.md`. Link them from the index with relative paths, for example `- [T001 — Example](issues/T001.md)`.

## Captured issue

```markdown
# T001 — [Short title]

Status: backlog

Original idea: [Keep the learner's wording concise and faithful.]
```

Create IDs by inspecting existing issue filenames and choosing the next unused `Tnnn`. Never overwrite. Do not infer acceptance criteria, focus, or priority while merely capturing an idea.

## Started issue

```markdown
# T001 — [Short title]

Status: active
Goal: [G001 or none]

## Outcome
[Observable result, agreed with learner.]

## Acceptance criteria
- [ ] [Observable behavior or evidence.]

## Learning focus
[Concepts the learner wants to practice.]

## Milestones
- [ ] [A few bounded outcomes; avoid prescribing implementation steps.]

## Checks
- [Safe, relevant command or inspection; define only what is known.]

## Current note
[Optional concise blocker, decision, or smallest resume action.]

## Latest evidence
Not verified.
```

Include only useful sections. Keep the ordinary active issue concise, roughly one screen where practical. A captured issue becomes a started issue only after clarifying essential scope, learning focus, and acceptance criteria. Preserve the original idea.

## Goal document (optional)

```markdown
# G001 — [Outcome]

Outcome: [Larger result]
Boundaries: [What is and is not included]
Issues: [Relative links]
```

## Evidence entry

Replace or refine the latest evidence for the same criterion/check; retain evidence for distinct criteria. Avoid an attempt-by-attempt journal.

```markdown
- [criterion/check]: **passed | failed | partial | blocked** — [date; command or inspection; concise evidence and limitations; revision/worktree context when useful]
```

A user report is not agent verification. A passing build supports only what that build establishes. If code changes after verification, retain the historical evidence but identify that it may not apply to the current worktree. `done` requires learner confirmation and must not imply unverified criteria passed. Cancellation/reduced scope is not verified completion.

## Legacy migration manifest

During an approved migration, add a concise `## Legacy references` entry to the index listing original files, their retained role, migration date, and any unresolved status/scope conflicts. Do not rename, rewrite, delete, or mark legacy sources as migrated until targets are reviewed and validated. Preserve originals byte-for-byte; keep the manifest and rollback instructions available. Never silently create new tracker files alongside a legacy workflow without first proposing and obtaining approval for migration.
