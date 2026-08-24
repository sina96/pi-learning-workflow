# Generated Project Templates

Adapt bracketed content to known project facts. Do not leave vague placeholders when sufficient information was supplied. Preserve any existing files instead of applying these templates over them.

## `AGENTS.md`

```markdown
# Learning Project Instructions

Before helping, read `docs/current_task.md`, `docs/progress.md`, `docs/verify.md`, relevant portions of `docs/hints.md`, and `docs/manifesto.md` when workflow decisions are involved.

- Treat `docs/current_task.md` as the source of truth for scope. Keep all milestones of one coherent task in that file.
- The learner writes implementation code. Make no source, test, configuration, formatting, dependency, or generated-code changes unless the user explicitly requests them.
- Prefer explanations, reviews, diagnostics, incremental hints, and pseudocode. Do not provide a complete solution when a smaller hint is sufficient.
- Verify only the current milestone unless broader verification is requested. Do not change implementation during verification.
- After completed verification, update `docs/progress.md` with accurate commands, results, and evidence.
- Modify or archive the current task only with explicit user direction. Never silently overwrite workflow files.
- Treat implementation completion, verification, and archival as separate states. Never describe an incomplete or unverified archive as completed.

## Project-specific additions

[Language/tooling, safe test commands, CI constraints, generated artifacts, and other project-specific rules.]
```

## `docs/current_task.md` — no active task

```markdown
# Current Learning Task

**State:** No active task.

Use `/add-new-learning-task [goal, language, requirements, or constraints]` to define one coherent substantial task. The learner owns and writes all implementation code unless they explicitly request a code change.
```

## `docs/current_task.md` — active task

```markdown
# Current Learning Task: [Specific title]

**State:** Active
**Implementation owner:** The learner writes implementation code. Agents explain, review, diagnose, hint, and verify unless explicitly asked to change code.

## Goal and learning outcomes

[Concrete goal and concepts the learner should practice.]

## Context

[Existing project state and motivation.]

## Functional requirements

- [Observable required behavior.]

## Non-functional requirements

- [Quality, safety, performance, compatibility, or maintainability requirement.]

## Constraints

- [Tools, boundaries, prohibited shortcuts, and learner-ownership constraints.]

## Acceptance criteria

- [ ] [Evidence-based criterion.]

## Milestones

1. **[Milestone]** — [bounded outcome]
2. **[Milestone]** — [bounded outcome]

## Relevant commands and interfaces

- `[safe command or interface]` — [purpose]

## Optional extensions

These are not required for task completion.

- [Clearly optional work.]
```

## `docs/progress.md`

```markdown
# Learning Progress

## Current state

- **Task:** [Title or none]
- **Milestone:** [Current milestone or none]
- **Status:** [not started | in progress | blocked | implementation-complete | verification failed | verified]
- **Smallest next action:** [One concrete learner action]

## Completed milestones

- None.

## Decisions and blockers

- None.

## Learning notes

- None.

## Verification history

- None. A result belongs here only after checks actually run or evidence is inspected.

## Archive history

- None. Record archive path, date, completion state, verification state, and informed early-archive authorization when applicable.
```

## `docs/hints.md`

```markdown
# Learning Hints

Hints are organized by milestone and strengthened incrementally. They favor concepts, guiding questions, pseudocode, references, and debugging strategies over finished implementation code.

## Current milestone

No hints recorded. Before adding guidance, inspect the learner's relevant code and avoid duplicating an existing milestone section.
```

## `docs/verify.md`

```markdown
# Verification Plan

Verification does not modify learner implementation. Verify the current milestone only unless the user requests a named milestone or whole-task verification.

For every check:

1. use temporary or isolated data where applicable;
2. record the exact command or inspection;
3. inspect exit status and relevant stdout/stderr;
4. report `passed`, `failed`, `partial`, or `blocked` with evidence;
5. record completed results in `docs/progress.md`;
6. give the smallest next action without silently fixing failures.

## Current milestone checks

- [Project-specific reproducible check, or state that it must be defined with the task.]

## Whole-task checks

- Confirm every required acceptance criterion against implementation and evidence.
- Run the applicable safe project test/lint/build commands defined for this project.
- Confirm the result is recorded separately from implementation-complete status.
```

## `docs/manifesto.md`

```markdown
# Learning Workflow Manifesto

- Keep one coherent active task and define requirements and “done” before implementation.
- Divide large work into milestones without fragmenting its goal; work on one milestone at a time.
- Ask for incremental hints before complete solutions, and retain learner ownership of implementation.
- Record meaningful decisions, blockers, and concise learning notes.
- Verify before marking a milestone complete; distinguish evidence from assumptions.
- Treat implementation completion, verification, and archival as separate states.
- Archive completed tasks only after verification and an explicit archive request.
- Require informed confirmation before archiving incomplete, failed, or unverified work, and label it accurately.
- Keep project files—not chat history—as the source of truth.
- Use version control and small checkpoints.
- Revise task scope deliberately; never allow silent scope drift.
```

## Archive metadata block

Prepend this to the preserved task content:

```markdown
# Archived Learning Task: [Title]

- **Archived on:** YYYY-MM-DD
- **Final implementation status:** [complete | incomplete | ambiguous]
- **Final verification status:** [verified | unverified | failed | partial | blocked]
- **Archive reason/note:** [Concise note]
- **Early archival explicitly authorized:** [no | yes — preserve the user's informed decision]
- **Smallest suggested next action:** [Action or none]
```

After confirmed archival, use the no-active-task template for `docs/current_task.md`. Keep `docs/done/.gitkeep` as a non-Markdown placeholder; archived Markdown files may coexist with it.
