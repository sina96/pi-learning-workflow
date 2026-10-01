# pi-learning-workflow

[![CI](https://github.com/sina96/pi-learning-workflow/actions/workflows/ci.yml/badge.svg)](https://github.com/sina96/pi-learning-workflow/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/pi-learning-workflow?logo=npm)](https://www.npmjs.com/package/pi-learning-workflow)

A lightweight workflow for learning by **building and testing yourself**, with coaching and agent verification when you ask. The tracker supports that work; maintaining the tracker is not another task.

The learner owns implementation. Agents can give hints, explanations, detailed walkthroughs, review, and verification on demand. A walkthrough is not permission to edit code. Verification records evidence and asks before closing work.

This is a Pi package with one Agent Skills-compatible skill and six prompt templates. It includes **no executable extension** and does not run package code.

## What the workflow feels like

- Returning to a project does not trigger automatic recaps, inspection, tests, or file changes. Ask to resume for a concise recap of recorded state, distinguished from fresh inspection.
- “Save this idea” captures a concise backlog item without changing focus.
- “Let's work on this” clarifies the outcome, acceptance criteria, learning focus, and a few light milestones.
- Asking for help gets the requested depth. If unclear, the agent asks whether you want a hint, explanation, or walkthrough.
- Meaningful milestones, blockers, and decisions may be recorded. Ordinary help is not a diary.
- Verification reports evidence and limitations, updates the issue, and asks before closure. It never silently fixes your implementation.
- Switching from unfinished work requires a choice: pause and switch, or queue the new issue and keep focus. Nothing is archived just to start something else.

## Generated layout

```text
AGENTS.md
.learning/
├── index.md             # links and current focus pointer
├── goals/               # optional larger outcomes
└── issues/
    ├── T001.md          # one concise file per issue
    └── T002.md
```

Optional saved learning notes are linked only when useful. The index does not duplicate issue details; the issue file owns its scope, status, meaningful current note, and latest relevant evidence. A standalone issue does not need a goal. Statuses are `backlog`, `ready`, `active`, `paused`, `blocked`, `done`, and `cancelled`. `done` requires your confirmation and does not imply every criterion was verified.

## Install

```bash
# npm package, global Pi settings
pi install npm:pi-learning-workflow

# npm package, project-local Pi settings
pi install -l npm:pi-learning-workflow

# Local path, global or project-local settings
pi install /absolute/path/to/pi-learning-workflow
pi install -l /absolute/path/to/pi-learning-workflow

# Git source, global or project-local settings
pi install git:github.com/sina96/pi-learning-workflow
pi install -l git:github.com/sina96/pi-learning-workflow
```

A project-local install writes `.pi/settings.json`. Pi asks for project trust before loading project settings and resources; trust is an input-loading guard, not a sandbox. Context files such as `AGENTS.md` may load regardless of project trust. Review package instructions and use OS/container isolation for untrusted work. Restart Pi or run `/reload` after installation or resource changes.

## Commands

```text
/new-learning-project Go "build a URL shortener CLI"
/add-new-learning-task "save idea: add playlist support"
/add-new-learning-task "let's work on playlist support"
/give-learning-hint "I'm stuck parsing URLs; hint"
/verify-learning-step "milestone 2"
/archive-learning-task T001
/gitignore-learning-docs
```

- `/new-learning-project`: create a minimal tracker only when safe. Existing workflows trigger a migration proposal, not competing files.
- `/add-new-learning-task`: capture ideas or clarify and start work. It never forces archival.
- `/give-learning-hint`: provide requested-depth help; ordinary coaching does not save hint text.
- `/verify-learning-step`: verify requested scope, record concise evidence, and ask before closure.
- `/archive-learning-task`: optional history housekeeping only; not closure and not required to start work.
- `/gitignore-learning-docs`: offer safe, append-only ignore rules for `.learning/` and workflow-owned `AGENTS.md` where appropriate.

Commands are shortcuts; natural-language requests work too. The skill may load automatically when a relevant request is made, or be forced with `/skill:pi-learning-workflow`.

## Existing projects and migration

Installation or initialization does not authorize migration. The agent inspects the old workflow read-only, proposes exact mappings and unresolved conflicts, and waits for approval. Migration preserves originals, does not assume old checkboxes mean verified, keeps completed history linked instead of creating a ticket per phase, validates the new tracker before activating it, and provides rollback guidance. Existing `AGENTS.md` instructions and `.gitignore` content are preserved; tracked files are never silently untracked. See `skills/pi-learning-workflow/references/migration.md`.

For example, a project with `PLAN.md`, `PROGRESS.md`, and `LEARNING.md` can keep those files as reference. Only selected unfinished outcomes become concise issues; the learner chooses focus. Conflicting or unclear statuses remain unresolved until clarified or separately verified.

## Limitations and safety

This package uses prompts and instructions rather than deterministic state-management code. Behavior depends on the agent following the skill. Review changes, keep version-control checkpoints, and do not treat project trust as a security boundary. The package does not guarantee safe shell behavior or model compliance.

## Disable or uninstall

Use `pi config` (or `pi config -l` for project settings) to disable resources, or remove the same source and scope used to install:

```bash
pi remove npm:pi-learning-workflow
pi remove -l npm:pi-learning-workflow
```

Removing the package does not delete project tracker files.

## License

[MIT](LICENSE) and made with love.
