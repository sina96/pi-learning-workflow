# Workflow operations

Follow the permission boundaries and low-friction principles in `../SKILL.md`. Slash commands are conveniences; equivalent natural-language requests work.

## General behavior

- Do not perform automatic startup recaps, inspection, checks, or tracker writes. When the learner asks to resume, read `.learning/index.md` and the focused issue, then give a concise recap. Label saved statements as recorded; inspect implementation only when requested or needed for the asked work, and label fresh observations separately.
- Ordinary hints, explanations, walkthroughs, and discussion do not change files. Match the requested help depth. If unclear, ask whether they want a hint, explanation, or walkthrough. Teaching never grants code-edit permission.
- Save only meaningful milestones, blockers, and decisions. Preserve provenance: learner-reported is not agent-observed or verified. Do not turn conversations into a transcript or save every hint.
- Use a few light milestones and concepts. Do not prescribe the learner's implementation approach unless requested.
- Preserve unrelated instructions, user content, legacy files, and unfinished work. Never silently overwrite or delete.

## Initialize a project

1. Inspect the root and hidden paths, `AGENTS.md`, Git state, existing `.learning/` state, and likely legacy workflow documents. This inspection is part of an explicit initialization request, not automatic startup behavior.
2. If no current or legacy workflow exists, ask only essential questions. Create the minimal tracker from `project-templates.md`; an initial issue is optional. Do not invent a goal or task.
3. If any learning workflow exists, do not scaffold a competing tracker. Explain current state and offer an inspect/propose/approve migration. Initialization or package installation alone is not migration approval.
4. Re-read what was created and summarize only meaningful changes and the next action.

## Capture or start an issue

Interpret intent:

- “Save this idea,” “add to backlog,” or equivalent: create a concise backlog issue using the learner's wording. Do not demand criteria, choose focus, or alter current focus.
- “Let's work on/start this”: clarify essential outcome, acceptance criteria, learning focus, and a few light milestones before marking it active. Define safe checks where known; do not invent commands.
- If the learner's intent is ambiguous between capture and start, ask one focused question.

Inspect index and issue files before allocating the next unused `Tnnn`; never overwrite. Update index links without copying issue details into it.

When another issue is focused and unfinished, ask whether to pause it and switch focus, or queue this issue and keep the current focus. Do not change focus until the learner chooses. Preserve its notes/evidence. Creating a backlog item never requires switching or closing another issue.

Keep one current focus. Statuses are `backlog`, `ready`, `active`, `paused`, `blocked`, `done`, and `cancelled`. Use `active` for the focused issue; a blocked focused issue may remain focus with `blocked` status. A switch marks the former issue `paused` unless the learner chooses otherwise. Never treat status changes as evidence of completion.

## Help the learner

Respond to the request without modifying tracker files unless meaningful state changed or the learner asked to save something.

- Hint: smallest useful pointer, question, concept, reference, or diagnostic.
- Explanation: explain the relevant concept and apply it to observed code where appropriate.
- Walkthrough: provide detailed ordered reasoning/examples when requested; do not silently implement them.
- Review/debug: inspect only relevant code. Separate observations from suggestions.

If progress, a blocker, or a decision is explicitly established, update only the concise current note/status needed. Distinguish “learner reports” from inspected facts. Do not automatically save transient attempts or hint text.

## Verify work

1. Read the index, relevant issue, and relevant verification instructions/code. Verify the requested scope; default to current milestone, not whole issue.
2. Choose safe, relevant checks. Do not edit implementation, tests, configuration, formatting, dependencies, or generated implementation. Use isolated data when appropriate.
3. Inspect exit status and meaningful output; report `passed`, `failed`, `partial`, or `blocked`, exact checks, evidence, limitations, and smallest next action.
4. Record evidence in the relevant issue, preserving distinct criterion evidence and accurately labelling its worktree/revision applicability. Do not add a chronological log for every attempt.
5. Never infer untested acceptance criteria from a passing build. Verification records evidence but does not close the issue. If all agreed criteria appear supported, ask whether the learner wants to mark it done. If incomplete, failed, partial, or blocked, explain the gap and leave it open unless learner explicitly requests a qualified closure.
6. Never fix failures unless separately asked for implementation changes.

## Meaningful progress and closure

When a meaningful milestone, blocker, or decision is established, update the issue and any necessary status/index pointer once. A milestone the learner reports is labelled reported; never check it off as verified without evidence. Keep resume notes short and current, replacing stale notes rather than appending history.

Closing is an explicit learner decision. On confirmation, mark `done` and preserve qualification if some criteria were not verified. Cancellation or agreed scope reduction is recorded distinctly; do not call it verified completion. No archive is required to create or start another issue.

## Optional archive command

Archiving is housekeeping only, never a task lifecycle prerequisite and never a substitute for closure. If requested, preserve the issue in a unique dated history path only after showing the destination and confirming whether the user wants a move or copy. Prefer leaving issue files in place and marking status when this is sufficient. Do not delete originals or automatically archive completed issues.

## Ignore generated tracker files

1. Confirm `git rev-parse --is-inside-work-tree` is `true`; get root with `git rev-parse --show-toplevel`. Otherwise make no changes.
2. Inspect only root `.gitignore`. Offer root-anchored entries for `/AGENTS.md` only if it is generated/owned by this workflow, and `/.learning/`. Never ignore or overwrite unrelated content. Preserve an existing deliberate version-control choice; ask if ambiguous.
3. Append only missing rules, idempotently. Do not remove tracked files from the index or run `git add`.
4. Re-read and report added entries. Explain ignore rules do not untrack existing files.

## Migrate a legacy workflow

Read `migration.md` and follow its inspect → propose → approve → stage → validate → activate procedure. Never migrate automatically at startup. Keep original files and preserve unrelated project instructions. A generic install/init request does not authorize migration.
