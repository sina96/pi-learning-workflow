---
name: pi-learning-workflow
description: Supports learner-owned coding projects with lightweight issue tracking, on-demand hints/explanations/walkthroughs, meaningful progress notes, and evidence-based agent verification. Use when initializing or explicitly migrating a learning project, capturing/starting work, asking for coaching or verification, or maintaining the .learning/ tracker.
license: MIT
compatibility: Requires filesystem access; commands and package installation are Pi-specific, while the skill follows Agent Skills format where practical.
metadata:
  package: pi-learning-workflow
  version: 0.2.0
---

# Pi Learning Workflow

This workflow exists to support **learning, building, testing, and on-demand help and verification**. Tracking is deliberately lightweight. Read [workflow operations](references/workflow-operations.md) for requests that use the tracker. Read [project templates](references/project-templates.md) only when initializing or repairing it. Read [migration](references/migration.md) only for an explicitly requested and approved legacy migration.

## Default behavior and permissions

- Do not automatically recap, inspect project files, run checks, or write tracking files when a session starts. When asked to resume, recap saved state and identify it as recorded; distinguish it from fresh inspection.
- The learner owns implementation. Do not change source, tests, configuration, formatting, dependencies, or generated implementation without explicit permission. Being stuck repeatedly is not permission.
- Match requested help depth: hint, explanation, or walkthrough. If unclear, ask which. A detailed walkthrough is still not permission to implement.
- Ordinary coaching and discussion are read-only with respect to the tracker. Save only meaningful milestones, blockers, and decisions, or when asked. Label learner-reported facts separately from agent-inspected and agent-verified facts.
- Verification may inspect and run safe relevant checks, but never fixes implementation. Record concise evidence, limitations, and status. Ask before closing an issue.
- Adding an idea does not change focus. Starting new work while another issue is unfinished requires asking whether to pause and switch or queue it while keeping focus.

## Tracker model

The generated tracker lives in `.learning/`: one index with optional goals and individual issue files. The index holds links and one focus pointer; issue files are authoritative for issue scope/status/evidence. A captured idea may be a short backlog item. Starting work clarifies outcome, acceptance criteria, learning focus, and a few light milestones. Do not require goals for standalone issues or generate empty boilerplate.

Statuses: `backlog`, `ready`, `active`, `paused`, `blocked`, `done`, `cancelled`. Keep one current focus; a blocked issue can remain focused. `done` requires learner confirmation and does not imply unverified criteria passed. No archive is required before starting another issue.

## Reading discipline

When asked about tracker state, read `.learning/index.md` and the relevant issue only. When asked for help or verification, also inspect only the relevant implementation/check instructions. Do not load all notes or legacy documents by default. Read legacy sources only for an explicitly approved migration or when they are directly relevant and requested.

## Safety

Inspect before writing. Do not silently overwrite, delete, migrate, or create a competing tracker beside legacy files. Migration requires a concrete proposal and approval, preserves originals, labels historical status honestly, validates before activation, and reports rollback. No workflow guarantees model compliance or forms a security sandbox; review changes and keep version-control checkpoints.
