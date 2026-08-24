# Workflow Operations

Load this reference for an explicit workflow command. Apply all safety invariants in `../SKILL.md`.

## Initialize a project

1. Inspect the target directory, including hidden files, Git state, an existing workflow, `AGENTS.md`, and legacy files.
2. Use supplied arguments for language, topic, project, constraints, and desired outcomes. Ask focused questions only for essential missing information.
3. If workflow paths already exist, do not overwrite them. Report what exists and offer a merge/repair plan.
4. If any legacy file exists, stop before scaffolding or migration. Show the exact detected files, a proposed source-to-destination mapping, conflict handling, and how exact requirements and originals will be preserved; ask for approval of that plan. A command invocation alone is not migration approval.
5. Only when there is no existing/legacy conflict, or after the user explicitly approves a safe plan, create only:
   - `AGENTS.md`
   - `docs/current_task.md`
   - `docs/progress.md`
   - `docs/hints.md`
   - `docs/verify.md`
   - `docs/manifesto.md`
   - `docs/done/.gitkeep`
6. Use `references/project-templates.md`, adapting content to known project details. If enough task detail exists, create a substantial active task; otherwise use the explicit no-active-task state and do not invent requirements.
7. Do not generate exercise implementation. Re-read created files and summarize exact results and declined overwrites.

Never create `EXERCISE.md`, `MISSION.md`, or root-level workflow-document copies.

## Add a new task

1. Read the workflow and inspect whether `docs/current_task.md` has a real active task rather than the explicit empty state.
2. If none exists, gather essential task information, write one coherent task using the task template, initialize current status in `docs/progress.md`, and add task-specific verification or hint sections only when useful. Do not write implementation.
3. If one exists, do not overwrite it. Evaluate implementation-complete and verified separately; summarize both states and explain the one-active-task rule.
4. If complete and verified, an explicit request to add the new task permits safe archival of the current task as the prerequisite, but first summarize the evidence and clarify ambiguity if any. Archive, verify that archival succeeded, then create the new task.
5. If incomplete, failed, unverified, or ambiguous, recommend finishing or verifying first, then always end the response with one focused question that explicitly asks whether to archive it anyway with the exact applicable status and then create the requested task. A recommendation alone is insufficient. Do nothing until informed confirmation.
6. After confirmed early archival, preserve all outstanding work and evidence, label status accurately, record user authorization, and create the new task only after archival succeeds.

A request to divide work creates milestones in the same `docs/current_task.md`, never multiple active task files.

## Give a hint

1. Read active task, progress, relevant existing hints, and relevant learner code.
2. Identify the current milestone and likely blocker. If ambiguous, ask a focused question.
3. Give the smallest useful milestone-specific hint: a concept, diagnostic question, reference, debugging strategy, or pseudocode. Avoid future milestones.
4. Honor an optional requested strength, escalating progressively. Finished implementation still requires an explicit code request.
5. Find the milestone's existing section in `docs/hints.md`. Refine it or append only novel guidance; do not duplicate the section or destroy useful prior hints.
6. Report what guidance changed.

## Verify a step

1. Read active task, progress, verification plan, relevant hints, and learner implementation.
2. Resolve the current milestone unless arguments name another milestone or request whole-task verification.
3. Select only relevant, safe checks from `docs/verify.md`; use isolated data and avoid destructive/external effects unless explicitly approved.
4. Snapshot or inspect implementation state as needed. Run checks without editing source, tests, configuration, formatting, dependencies, or generated code.
5. Inspect exit status plus meaningful stdout and stderr. Report `passed`, `failed`, `partial`, or `blocked` with commands and evidence.
6. Add one dated, non-duplicative verification-history entry to `docs/progress.md`, update milestone status only to the extent proved, and name the smallest next action.
7. Do not fix failures or archive automatically.

## Ignore learning documents in Git

1. Confirm the current directory is inside a non-bare Git working tree with `git rev-parse --is-inside-work-tree` and resolve its root with `git rev-parse --show-toplevel`. If either check fails or does not return `true`, make no changes.
2. Target only `.gitignore` at that repository root, even when the command is invoked from a nested directory. Inspect it first if it exists; never replace its existing content.
3. Ensure these root-anchored entries are present exactly once:

   ```gitignore
   # pi-learning-workflow
   /AGENTS.md
   /docs/current_task.md
   /docs/progress.md
   /docs/hints.md
   /docs/verify.md
   /docs/manifesto.md
   /docs/done/
   ```

4. If every path entry is already present, leave `.gitignore` byte-for-byte unchanged; the marker comment alone is not required. Otherwise append only missing path entries. Add the marker only when appending entries and only if that exact marker does not already exist. Preserve existing ordering, comments, line endings where practical, and finish with a newline without introducing duplicate blank blocks.
5. Re-read `.gitignore` and, when useful, use `git check-ignore -v --no-index` to confirm the patterns. Do not alter generated learning documents, Git configuration, the index, or tracked state; in particular, do not run `git add` or remove already tracked files from the index.
6. Report whether `.gitignore` was created, updated, already sufficient, or skipped because the directory was not a Git worktree, including the repository-root path and entries added.

Repeated invocation must be idempotent. Existing tracked workflow files remain tracked until the user explicitly removes them from the index; this command only changes ignore rules.

## Archive a task

1. Read task, progress, verify plan, relevant implementation, and recorded/current evidence.
2. Establish implementation-complete and verified independently. State the evidence for each.
3. The command invocation is an explicit archive request when the active task and state are clear.
4. If both states are established, derive a sanitized lowercase hyphenated slug (or sanitize the optional custom slug), choose today's unique archive path, preserve the full task plus archive metadata and relevant decisions/blockers/verification outcome, then write it without overwriting.
5. Only after confirming the archive exists and is complete, replace `docs/current_task.md` with the explicit empty state and add archive history to `docs/progress.md`.
6. If either state is missing, failed, or ambiguous, explain the exact gap, offer `/verify-learning-step`, and ask whether to archive anyway. The question must say the archive will be labeled incomplete, unverified, failed verification, or the applicable combination. Do not proceed on a generic archive/add-task request alone.
7. After informed confirmation, follow the same preservation flow, including blockers, unfinished milestones, failed checks, smallest next action, and the fact/date of user-authorized early archival.
8. Never delete history, automatically create another task, or equate archival with completion.

Filename uniqueness is deterministic: try `YYYY-MM-DD-slug.md`, then `YYYY-MM-DD-slug-2.md`, `-3.md`, and upward. If archival or verification of the archive fails, leave the active task in place and do not create a replacement task.
