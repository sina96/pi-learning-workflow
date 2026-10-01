# Learning workflow redesign

Status: first implementation pass complete; prompt-only workflow. No executable extension or automatic migration tool was added.

This document captures the user interview, implementation sequence, and legacy migration guidance for `pi-learning-workflow`. It is not a new learning-project scaffold. The package now describes the lightweight workflow; migration remains an explicitly approved, agent-guided operation.

## Purpose

Support a learner who builds and tests their own project, requests agent help on demand, and asks agents to verify their work. Tracking should support this loop without becoming another job.

The current package is a skill plus six prompt templates, not an executable extension. Simplify that workflow first; introduce executable tracking only if a prototype demonstrates that deterministic operations are needed.

## Confirmed behavior

| Situation | Required behavior |
| --- | --- |
| Returning to a project | Wait until asked. Be ready to recap current focus, last recorded state, and a useful next action. Do not automatically inspect, run checks, or update files. |
| “Save this idea” | Capture a short backlog issue without forcing a planning interview or changing focus. |
| “Let's work on this” | Clarify essential scope, learning focus, and acceptance criteria before starting. |
| Breaking work down | Use a few light milestones and relevant concepts; leave implementation decisions to the learner. |
| Asking for help | Honor the depth implied by the request. If unclear, ask whether the learner wants a hint, explanation, or walkthrough. |
| Detailed help | Walkthroughs are available on demand. Help depth does not grant permission to edit implementation. |
| Verification | Inspect and run relevant safe checks, record evidence, report gaps, and ask before closing. Never silently fix implementation. |
| Saving progress | Save meaningful milestones, blockers, and decisions, not every exchange. Distinguish learner-reported progress from agent verification. |
| Switching unfinished work | Ask whether to pause the current issue and switch, or queue the new work and retain focus. Preserve unfinished work. |

The learner owns source, tests, configuration, formatting, dependencies, and generated implementation by default. Explicit implementation-edit permission remains necessary, even after repeated difficulty.

## Design principles

- One authoritative home for each fact; avoid synchronizing plan, progress, hints, and verification copies.
- Multiple queued issues, one current focus. Creating an issue is not starting it.
- Goals describe larger outcomes; issues describe bounded work; milestones are lightweight steps inside an issue.
- Stable IDs, not phase numbers that change when work is inserted.
- No prewritten walkthroughs for every future issue. Save explanations only when requested or when capturing a concise meaningful decision.
- No mandatory journaling, automatic archival, or archive-before-starting ceremony.
- A recap uses saved state unless fresh inspection is requested or necessary to answer the request. Clearly label recorded versus freshly inspected facts.
- Git history can preserve edits; active files should not become append-only transcripts.
- Old verification must not be presented as proof of newly changed code.

## Proposed storage model

This layout is a proposal to validate with realistic examples, not an interview-approved architecture decision:

```text
AGENTS.md
.learning/
  index.md
  goals/
    G001.md
  issues/
    T001.md
  notes/
    T001.md            # only when useful and explicitly saved
```

`AGENTS.md` contains short, stable permission and interaction rules, plus the pointer to `.learning/index.md`. Preserve unrelated project instructions.

`index.md` contains the schema version, current focus ID, and compact links to goals/issues. It does not duplicate issue status, acceptance criteria, or evidence. Lists may group links by goal, but an issue's file remains its status authority.

A goal contains its outcome, boundaries, and linked issues. Do not require a goal document for every small standalone issue. Adding an issue to an existing goal must not silently broaden that goal's agreed scope.

A captured issue needs only an ID, title, `backlog` status, and the original idea. Starting it adds an outcome, acceptance criteria, learning focus, a few milestones, and checks as needed. Avoid boilerplate empty sections.

An issue's normal active content should fit approximately on one screen. This is a target, not a hard cap on requirements or necessary evidence. Lengthy optional explanations belong in linked notes. Evidence may link to larger retained outputs rather than embedding them.

Proposed statuses: `backlog`, `ready`, `active`, `paused`, `blocked`, `done`, `cancelled`. Focus is a separate pointer; blocked work can remain focused. Permit at most one active issue. Exact transition mechanics should be exercised in the prototype before being fixed as a contract.

Each issue holds:

- Scope and observable acceptance criteria.
- Light milestones and the concept each introduces.
- Current status, meaningful blockers/decisions, and an optional resume note.
- Latest relevant verification per criterion or check, with date, command/inspection, result, limitations, and inspected revision or worktree context when available.
- Clear labels for reported, inspected, and verified claims.

Keep evidence for distinct criteria rather than replacing all previous evidence with the latest unrelated check. When later changes make evidence potentially stale, retain it but label its applicability accurately. Avoid a growing chronological log of every attempt.

Closing requires the learner's confirmation. Verification proposes closure only when applicable criteria are supported. A learner may explicitly close unverified or partial work, but the record must retain that qualification; `done` must never imply verification that did not occur. Cancelled or reduced-scope work is distinct from verified completion.

## Proposed interaction surface

Keep existing command names where their meaning can remain honest; commands are conveniences, not prerequisites for natural-language requests.

- `/new-learning-project`: create the minimal tracker and stable instructions; an initial issue is optional.
- `/add-new-learning-task`: capture or prepare an issue according to the request, without mandatory archival. Starting while another issue is focused invokes the switch question.
- `/give-learning-hint`: explicit hint request; answer without automatically saving the hint. Natural-language explanation and walkthrough requests also work.
- `/verify-learning-step`: verify the current milestone by default or an explicitly named scope, save evidence, and ask before closing. Do not infer whole-issue completion from a milestone check.
- `/gitignore-learning-docs`: safely support the new generated paths while preserving existing rules and tracked files.
- `/archive-learning-task`: retain as an explicit optional history operation or a clearly explained compatibility entry point. It must not close an issue, remove unfinished work, or be required to start another.

Prototype whether an explicit focus/status command is useful before adding more slash commands. Avoid generic names likely to collide with other packages.

## Implementation sequence

### 1. Prototype the contract without changing learner projects

Create small fixtures covering an empty project, captured idea, prepared issue, blocked issue, switched issue, and verified-but-not-closed issue. Walk through capture, start, help, checkpoint, verification, closure, and return after a break.

Resolve storage and lifecycle details against these examples. Do not add dashboards, background automation, or an executable extension simply because they are possible.

Deliverable: agreed fixture layout and concise operation contract.

### 2. Rewrite the skill and generated templates together

Update:

- `skills/pi-learning-workflow/SKILL.md`
- `skills/pi-learning-workflow/references/workflow-operations.md`
- `skills/pi-learning-workflow/references/project-templates.md`

Replace the mandatory multi-document reading list with the index, focused/requested issue, and only relevant code or linked notes. Make ordinary help read-only unless it establishes a meaningful milestone, blocker, or decision. Do not manufacture progress from the fact that a hint was given.

Implement capture-versus-start, focused-work switching confirmation, light milestones, requested help depth, evidence recording, and confirmation before closure. Specify that request-scoped maintenance is allowed; silent scope changes and implementation edits are not.

Remove mandatory hint persistence, archive-before-new-task rules, and verbose end-of-operation reporting. Report actual changes and important evidence concisely.

### 3. Update prompts, documentation, and packaging contracts

Update the six prompts to match the new operations. Preserve compatibility names where possible and document changed semantics. Rewrite `README.md` around the learner loop, minimal layout, examples, permissions, and migration.

Update `tests/validate.mjs`: it currently hard-codes six commands, no executable extension, and the old resource contract. Change only constraints deliberately affected by the chosen design. Keep release/publishing checks intact.

If migration guidance becomes a skill reference, add `skills/pi-learning-workflow/references/migration.md` and link it from the skill. The root `DESIGN.md` is a planning artifact, not a runtime resource; no publishing change is needed just to add it.

### 4. Build and test migration support

Implement the inspect/propose/approve/validate process below. Use fixtures, not edits to ytunes or other user projects, while developing it. Preserve originals and provide a rollback path.

### 5. Test actual behavior, not only instruction wording

Replace old layout/archival assertions in `tests/workflow-contract.test.mjs`. Keep static validation as a packaging guard, but add fixture-based operation tests for any executable helpers.

For prompt-only behavior, run a documented agent acceptance exercise against isolated fixture repositories and inspect the diffs. Do not describe regex assertions as proof that an agent obeys the workflow.

Required scenarios:

1. Loading/reopening the tracker performs no automatic recap, verification, or writes.
2. Requested recap distinguishes recorded state from fresh inspection.
3. Capturing an idea does not require detailed criteria or alter focus.
4. Starting an issue produces light milestones, not a full implementation recipe.
5. Starting different work asks pause-and-switch versus queue; declining preserves focus.
6. An ordinary hint/explanation/walkthrough changes no files when no meaningful state change occurred.
7. Explicit depth is honored; ambiguous help asks for depth.
8. A meaningful reported milestone is saved as reported, not verified.
9. Verification records accurate evidence but never edits implementation or closes without confirmation.
10. A passed build does not satisfy unrelated functional criteria; partial/blocked results remain visible.
11. Changed code does not inherit an unsupported claim of current verification.
12. Repeated operations do not duplicate IDs, issue sections, evidence, or ignore rules.
13. Migration preserves requirements, legacy evidence, original files, and unrelated `AGENTS.md` instructions.
14. Conflicting targets, interrupted migration, and malformed state stop safely without overwriting work.

Run `pnpm check` and `pnpm test`, inspect the package contents, and verify command discovery in Pi before release.

### 6. Decide whether a thin executable extension is warranted

Only after the simplified workflow has been exercised, evaluate whether agent-managed Markdown is sufficiently reliable. If mechanical mistakes persist, implement deterministic ID allocation, validated transitions, atomic state operations, conflict detection, and optional explicit status UI in a thin extension or helper.

Keep teaching and scope clarification with the agent. Keep mechanical tracking in code. No automatic inspections or writes on session startup. An extension is not a security sandbox or a guarantee of model compliance.

Before implementing this stage, read current Pi extension/tool/UI documentation and examples, choose the minimum API surface, add functional tests, and deliberately update the manifest, package contents, and validator. This stage is a decision gate, not already-approved additional scope.

## Migration of older learning projects

### Supported inputs

1. Current package layout: `docs/current_task.md`, `docs/progress.md`, `docs/hints.md`, `docs/verify.md`, `docs/manifesto.md`, `docs/done/`, and generated `AGENTS.md` rules.
2. Earlier workflows: `PLAN.md`, `PROGRESS.md`, `LEARNING.md`, `EXERCISE.md`, `MISSION.md`, `VERIFY.md`, `hints.md`, and project-specific variants.
3. Mixed layouts or partly migrated projects: detect conflicts rather than selecting a source silently.

Updating or installing the package does not authorize migration. Never migrate automatically at startup. Until migration is approved, recognize the legacy workflow without creating a competing new tracker or assuming old state is accurate.

### Migration procedure

1. **Inspect read-only.** Identify exact sources, existing destinations, Git status, active work, archived work, current behavior rules, and contradictory status/scope. Do not run builds or modify implementation as a side effect of migration.
2. **Propose a mapping.** Show which goals/issues will be created, the proposed focus, retained history, unresolved contradictions, target paths, and changes to generated instructions/ignore rules. Ask for approval before writes. A generic initialization request is not migration approval.
3. **Establish preservation and rollback.** Record a source/destination manifest and preserve byte-for-byte originals. In dirty or untracked projects, do not assume Git alone is a backup. Use an approved non-overwriting snapshot or staging area; never commit, stash, delete, or untrack user files automatically.
4. **Migrate durable facts.** Preserve required scope, acceptance criteria, unresolved work, meaningful decisions, blockers, and relevant evidence. Keep light milestones within an issue. Do not automatically turn every old phase or hint into an active issue.
5. **Handle history separately.** Completed phases can remain linked legacy history. Historical teaching material can remain in place or be linked as optional notes. Checkboxes become legacy reported status, not verified completion. Preserve failed/partial results and early-archive qualifications.
6. **Resolve contradictions explicitly.** Ask only for decisions essential to establish current scope/focus; retain unknowns rather than guessing. Further verification is a separate requested operation. Do not mark implemented-looking work done merely to make the migration neat.
7. **Stage and validate.** Check IDs, links, focus, requirement preservation, and evidence labels before activating the tracker. Existing targets require an approved merge plan; never overwrite them. Failed migration must leave the legacy entry point usable.
8. **Activate the new entry point.** After validation, update only the learning-workflow portion of `AGENTS.md` to point to the new tracker. Preserve unrelated guidance. Mark retained legacy documents clearly as historical through an approved notice or migration index so agents do not treat two layouts as current authority.
9. **Check ignore rules.** Offer the new root-anchored learning paths without removing unrelated rules. Explain that ignoring does not untrack existing files. Preserve any deliberate choice to version-control the tracker; migration does not automatically change that choice.
10. **Summarize and retain rollback.** Show what changed, what was retained, uncertain statuses, and how to restore the previous entry point. Do not delete originals after migration unless the user separately approves cleanup. Repeated migration detects the manifest and existing state rather than duplicating issues.

### Example: ytunes-go-tui

Proposed mapping, requiring project-specific approval:

- Keep `PLAN.md`, `PROGRESS.md`, `LEARNING.md`, and `RELEASE.md` intact as reference/history. `RELEASE.md` remains the operational release runbook, not a tracker duplicate.
- Link completed phase history rather than rewriting all 35 phases into new issue files.
- Capture separate open issues for Homebrew distribution, Windows exploration, YouTube playback reliability, persistent mpv sessions, and release automation status reconciliation.
- Do not infer Homebrew is the focus simply because it is the first unchecked entry; ask what the learner wants to work on now.
- Flag release automation as ambiguous: progress leaves it unchecked while describing configuration already added. Establish remaining criteria before calling it complete.
- Replace stale phase-specific workflow instructions in `AGENTS.md` with stable learner-ownership rules and the new entry-point pointer, preserving relevant tooling guidance.
- Flag conflicts concerning phase numbering, theme persistence, IPC, and release order. Preserve their historical context without copying obsolete exclusions into current instructions.
- Keep backlog ideas concise. Existing long walkthroughs are optional references, not required reading or mandatory new issue content.

## Release acceptance

The redesign is ready when the user can capture work, start with light milestones, build independently, request appropriate-depth help, and obtain recorded agent verification without bookkeeping ceremonies. Focus changes and closure require the agreed confirmation. Existing projects can opt into a non-destructive migration with clear status provenance and rollback.
