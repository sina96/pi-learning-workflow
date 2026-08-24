# Validation

Validated locally on 2026-08-24 with Pi 0.84.2, Node 22, and pnpm 11.

## Automated checks

```bash
pnpm check
pnpm test
pnpm pack --dry-run
```

Results:

- `package.json` parsed and its seven explicit resource paths existed.
- Skill frontmatter name and description passed package checks.
- Pi's temporary package loader (`pi -e .`) reported exactly the six intended prompt commands and `skill:pi-learning-workflow`; it registered no generic workflow alias.
- Eight contract tests passed for exact scaffold paths, non-destructive repeat/migration rules, active-task protection, read-only verification, informed early archival, archive preservation/uniqueness rules, non-duplicative hints, and idempotent Git-ignore setup.
- The dry-run tarball contained root package metadata, `README.md`, `LICENSE`, all six root `prompts/`, the skill, and both progressive-disclosure references.

## Temporary Pi integration scenarios

Tests used temporary Git repositories, `--no-session`, `--offline`, temporary `-e <package-path>` loading, and no installation or settings changes.

Observed results:

1. **Empty repository scaffold:** created only `AGENTS.md`, the five `docs/*.md` workflow files, and `docs/done/.gitkeep`; generated no exercise implementation.
2. **Repeated scaffold:** workflow-file SHA-256 checksums were identical before and after; the agent reported the active task and declined replacement.
3. **Legacy repository:** detected `MISSION.md` and `PROGRESS.md`, proposed an exact mapping and preservation/conflict plan, asked for approval, created nothing, and preserved legacy checksums.
4. **Add with no active task:** created one coherent TypeScript task with five milestones and task-specific progress/verification content; generated no implementation files.
5. **Add with an active incomplete task:** reported implementation-incomplete and unverified separately, asked whether to archive with those exact statuses and continue, and left every workflow checksum unchanged while awaiting confirmation.
6. **Approved early archive:** preserved the complete task requirements, milestones, blockers/status, next action, and verification state in a dated archive; labeled it incomplete and unverified, recorded informed authorization, reset the active file, and created no new task.
7. **Complete verified archive:** independently inspected and checked a tiny POSIX-shell fixture, archived it as complete and verified, reset the active file, and left the implementation checksum unchanged.
8. **Git-ignore setup:** in a temporary Git worktree with an existing `.gitignore`, preserved its rule, added the exact root-anchored learning-workflow entries, and produced an identical checksum on repeated invocation; outside a Git worktree, created no `.gitignore`.

## Limitations and untested assumptions

This package is declarative: behavior is implemented through model-followed skill and prompt instructions, not an extension with transactional enforcement. Static tests validate the behavioral contract; temporary integration runs sample current-model compliance and are not deterministic guarantees for every model or compatible agent.

The deterministic `-2`, `-3` unique-name policy is contract-tested with exclusive file creation, but a second same-slug archive was not exercised end-to-end through a model. Failed filesystem archival, approved migration execution, failed/partial verification output, repeated hint refinement against real learner code, and automatic skill selection without an explicit command were not exercised end-to-end. They are covered by explicit skill rules and static assertions. Concurrent agents can still race between inspection and a write; users should review diffs and keep version-control checkpoints.
