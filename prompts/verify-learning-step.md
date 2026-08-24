---
description: Verify the current learning milestone safely and record evidence without fixing implementation
argument-hint: "[milestone or whole-task]"
---
Load and follow the `pi-learning-workflow` skill, especially its **Verify a step** procedure.

Inspect the active workflow and learner implementation. Verify only the current milestone unless the arguments explicitly identify another milestone or whole-task verification. Run only relevant safe checks, use isolated data where appropriate, inspect exit status and meaningful output, and make no implementation changes. Report `passed`, `failed`, `partial`, or `blocked`; record completed evidence in `docs/progress.md`; give the smallest next action; never archive automatically.

Verification scope: `${ARGUMENTS:-current milestone}`
