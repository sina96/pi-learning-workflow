# Package Development Instructions

This repository distributes a Pi package; it is not itself a generated learning project.

- Keep the explicit resource list in `package.json` synchronized with package files.
- Keep exactly six prompt-template commands: `new-learning-project`, `add-new-learning-task`, `give-learning-hint`, `verify-learning-step`, `archive-learning-task`, and `gitignore-learning-docs`.
- Do not add an extension unless declarative skills and prompt templates cannot provide the behavior.
- Keep `README.md`, `LICENSE`, `VALIDATION.md`, and the `prompts/` resource directory at the package root; Agent Skills material belongs under `skills/pi-learning-workflow/`.
- Preserve learner ownership, explicit informed confirmation for early archival, and no-silent-overwrite behavior in every workflow change.
- Run `pnpm check` and `pnpm test` after changes.
