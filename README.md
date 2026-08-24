# pi-learning-workflow

[![CI](https://github.com/sina96/pi-learning-workflow/actions/workflows/ci.yml/badge.svg)](https://github.com/sina96/pi-learning-workflow/actions/workflows/ci.yml)

`pi-learning-workflow` is a reusable Pi package for hands-on coding-learning projects. It keeps one substantial task, progress, hints, verification evidence, and archives in version-controlled project files. The learner writes implementation; agents explain, review, diagnose, hint, verify, and maintain workflow documents unless explicitly asked to change code.

The package contains no extension and executes no package code. It provides one Agent Skills-compatible skill and exactly six Pi prompt templates.

## Generated layout

`/new-learning-project` creates this layout only when doing so is safe:

```text
AGENTS.md
docs/
├── current_task.md
├── progress.md
├── hints.md
├── verify.md
├── manifesto.md
└── done/
    └── .gitkeep
```

The non-Markdown `.gitkeep` preserves an empty `docs/done/` in Git.

- `docs/current_task.md`: authoritative scope, requirements, acceptance criteria, and milestones for one coherent active task.
- `docs/progress.md`: current state, next action, decisions, blockers, learning notes, verification history, and archive history.
- `docs/hints.md`: non-duplicative, progressively stronger milestone guidance.
- `docs/verify.md`: reproducible milestone and whole-task checks.
- `docs/manifesto.md`: concise learner discipline.
- `docs/done/`: preserved task history with accurate status.
- `AGENTS.md`: automatically loaded project behavior and permission boundaries.

## Install

Review the package first: Pi packages and skills are trusted instructions with access through the agent's tools.

```bash
# Local path, global Pi settings
pi install /absolute/path/to/pi-learning-workflow

# Local path, project-local Pi settings
pi install -l /absolute/path/to/pi-learning-workflow

# Git source, global
pi install git:github.com/sina96/pi-learning-workflow

# Git source, project-local
pi install -l git:github.com/sina96/pi-learning-workflow
```

A project-local install writes `.pi/settings.json`. Pi asks for project trust before loading project settings and resources; trust is an input-loading guard, not a sandbox. Context files such as generated `AGENTS.md` load regardless of project trust unless context loading is disabled. Installed skills can direct an agent to use filesystem and shell tools with the user's permissions, so inspect this repository and use OS/container isolation for untrusted work.

Restart Pi or run `/reload` after installation or resource changes.

## Commands

```text
/new-learning-project Go "build a URL shortener CLI"
/add-new-learning-task Rust "build a parser with property tests"
/give-learning-hint "I am blocked on tokenization; weak hint"
/verify-learning-step "milestone 2"
/archive-learning-task "parser-foundations"
/gitignore-learning-docs
```

### `/new-learning-project [details]`

Inspects before writing, asks only essential questions, scaffolds project-specific workflow documents without implementation, detects repeated use, and proposes safe mappings for legacy files rather than overwriting them.

### `/add-new-learning-task [details]`

Creates a substantial task only when no task is active or after the old task is safely archived. Parts remain milestones in one file. It never overwrites an active task or creates implementation.

### `/give-learning-hint [blocker or strength]`

Inspects the current milestone and relevant learner code, gives the smallest useful hint, and refines the milestone's existing hint section without duplicating it.

### `/verify-learning-step [milestone or whole-task]`

Runs only relevant safe checks, uses isolated state where appropriate, records evidence and status, and does not edit implementation or archive the task.

### `/archive-learning-task [slug or note]`

Evaluates completion and verification separately, preserves the task under a unique dated filename, and leaves a deliberate no-active-task state. Missing or failed evidence requires informed confirmation before an accurately labeled early archive.

### `/gitignore-learning-docs`

When run inside a Git worktree, creates or updates the repository-root `.gitignore` with root-anchored entries for `AGENTS.md` and the generated workflow files under `docs/`. It preserves existing ignore rules, adds only missing entries, is idempotent, and does not untrack files that are already in Git. Outside a Git worktree it makes no changes.

The skill may also load automatically when Pi identifies initialization, coaching, hinting, verification, Git-ignore setup, archival, or next-task preparation in a repository using this layout. It can be forced with `/skill:pi-learning-workflow`.

## State and safety model

These states are independent:

1. **Implementation-complete**: required acceptance criteria appear satisfied after inspection.
2. **Verified**: applicable checks passed and evidence is recorded in `docs/progress.md`.
3. **Archived**: history was preserved under `docs/done/` after an explicit request or informed confirmation.

Archived does not mean completed. For incomplete, failed, unverified, or ambiguous work, the agent must explain the missing evidence, recommend verification where appropriate, and ask whether the user knowingly wants an archive with that exact status. Declining leaves workflow files unchanged. Approval preserves requirements, unfinished milestones, blockers, failed checks, evidence, and the smallest next action.

All operations inspect before writing, avoid deletion and silent overwrite, preserve unique archive names with deterministic numeric suffixes, and refuse to create a replacement task if required archival fails. Verification never grants permission to alter learner implementation.

## Existing workflows and migration

Legacy sources may include:

```text
EXERCISE.md  or MISSION.md  -> docs/current_task.md
PROGRESS.md                 -> docs/progress.md
hints.md                    -> docs/hints.md
VERIFY.md                   -> docs/verify.md
```

This is only a proposed mapping, not an automatic move. The agent must inspect exact content and conflicts, show the proposed mapping, preserve exact requirements, obtain approval, verify the migrated result, and retain originals unless their later removal is explicitly authorized. Existing target files are never silently replaced.

## Resource collisions

Pi derives prompt command names from filenames. Prompt and skill names can collide with resources from another location or package. Pi reports collision diagnostics and keeps the first discovered resource; for skills, the documented behavior is likewise to warn and keep the first. No generic aliases are included here.

Inspect startup diagnostics and the loaded resource summary, run `pi list` to inspect installed packages, or use `pi config` (`pi config -l` for project overrides) to enable/disable individual package skills and prompts. Package settings filters can narrow resources. If one of these six command names or `pi-learning-workflow` conflicts, disable the conflicting resource or package rather than assuming which copy loaded.

## Disable or uninstall

Use `pi config` or `pi config -l` to disable this package's skill or individual prompts without uninstalling. Remove the same source and scope used for installation:

```bash
pi remove /absolute/path/to/pi-learning-workflow
pi remove -l /absolute/path/to/pi-learning-workflow
pi remove git:github.com/sina96/pi-learning-workflow
pi remove -l git:github.com/sina96/pi-learning-workflow
```

Then run `/reload` or restart Pi. Removing the package does not delete generated project workflow files.

## Portability and limitations

Pi package installation, the explicit `pi` manifest, and slash prompt templates are Pi-specific. Agents that do not support Pi packages will not discover these six commands. The skill follows the Agent Skills structure where practical, but behavior still depends on the compatible harness loading and following it.

Generated `AGENTS.md` and ordinary Markdown workflow files remain partially portable to agents that understand those files. No workflow can technically guarantee model compliance, safe shell behavior, or idempotency by itself; review proposed changes and keep version-control checkpoints.

## Development and validation

```bash
pnpm check
pnpm test
pnpm pack --dry-run
```

See [`VALIDATION.md`](VALIDATION.md) for validation scope and remaining interactive-agent assumptions.

## License

[MIT](LICENSE)
