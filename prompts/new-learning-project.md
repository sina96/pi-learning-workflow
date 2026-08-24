---
description: Safely scaffold a learner-owned, file-backed coding-learning workflow
argument-hint: "[language, topic, or desired project]"
---
Load and follow the `pi-learning-workflow` skill, especially its **Initialize a project** procedure and project templates.

Initialize the workflow in the current target directory. Inspect before writing; do not overwrite, delete, or migrate existing or legacy files without an explicit approved plan. If any legacy workflow file exists, stop before scaffolding, show a concrete source-to-destination migration/merge mapping with conflict and preservation handling, and ask for plan approval. Create project-specific workflow content when the following arguments are sufficient, ask focused questions only when essential information is missing, and do not generate exercise implementation.

Arguments: `${ARGUMENTS:-No project details supplied; inspect first and ask only essential focused questions.}`

Finish by listing exactly what was created and what was left unchanged or declined.
