---
description: Give on-demand learning help at the requested depth without taking over implementation
argument-hint: "[blocker; hint, explanation, or walkthrough]"
---
Load and follow the `pi-learning-workflow` skill, especially **Help the learner**.

Honor the depth implied by the request: hint, explanation, or detailed walkthrough. If unclear, ask which. Inspect only relevant code when needed. Keep implementation learner-owned unless explicitly asked to edit it. Ordinary help does not update the tracker; save only a meaningful milestone, blocker, or decision, with reported/observed provenance.

Request: `${ARGUMENTS:-No details supplied; use the request context and ask only if help depth or blocker is unclear.}`
