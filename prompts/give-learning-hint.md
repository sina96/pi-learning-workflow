---
description: Give and record the smallest useful hint for the learner's current milestone
argument-hint: "[blocker or desired hint strength]"
---
Load and follow the `pi-learning-workflow` skill, especially its **Give a hint** procedure.

Read the active workflow, inspect relevant learner code, identify the current milestone and blocker, and provide the smallest useful milestone-specific hint. Prefer concepts, guiding questions, references, debugging strategies, and pseudocode. Avoid future milestones and finished implementation code unless the user explicitly requests code. Refine `docs/hints.md` without duplicate sections or loss of useful guidance.

Hint request: `${ARGUMENTS:-No blocker or strength supplied; infer only from inspected project evidence, asking if ambiguous.}`
