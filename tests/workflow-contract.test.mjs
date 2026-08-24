import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");
const all = [
  await read("skills/pi-learning-workflow/SKILL.md"),
  await read("skills/pi-learning-workflow/references/workflow-operations.md"),
  await read("skills/pi-learning-workflow/references/project-templates.md"),
].join("\n");

function expectAll(text, patterns) {
  for (const pattern of patterns) assert.match(text, pattern);
}

test("scaffold contract has exact layout, empty archive preservation, and no forbidden roots", () => {
  expectAll(all, [
    /`AGENTS\.md`/,
    /`docs\/current_task\.md`/,
    /`docs\/progress\.md`/,
    /`docs\/hints\.md`/,
    /`docs\/verify\.md`/,
    /`docs\/manifesto\.md`/,
    /`docs\/done\/\.gitkeep`/,
    /Never create `EXERCISE\.md`, `MISSION\.md`/,
  ]);
});

test("repeated scaffolding and legacy migration are non-destructive", () => {
  expectAll(all, [
    /If workflow paths already exist, do not overwrite them/,
    /Legacy files include `EXERCISE\.md`, `MISSION\.md`, `PROGRESS\.md`, `hints\.md`, and `VERIFY\.md`/,
    /show a proposed source-to-destination mapping/i,
    /Retain originals unless the user explicitly authorizes removal/,
  ]);
});

test("task replacement requires safe archival and never overwrites active work", () => {
  expectAll(all, [
    /If one exists, do not overwrite it/,
    /do nothing until informed confirmation/i,
    /create the new task only after archival succeeds/i,
    /requested parts as milestones in that same file/i,
  ]);
});

test("verification is evidence-based and cannot modify implementation", () => {
  expectAll(all, [
    /Verify only the current milestone/,
    /exit status plus meaningful stdout and stderr/,
    /without editing source, tests, configuration, formatting, dependencies, or generated code/,
    /`passed`, `failed`, `partial`, or `blocked`/,
  ]);
});

test("early archival distinguishes incomplete and unverified states", () => {
  expectAll(all, [
    /Implementation-complete/,
    /Verified/,
    /Archived/,
    /If confirmation is declined, make no workflow-file changes/,
    /incomplete, unverified, failed verification/,
    /never call such an archive completed/i,
  ]);
});

test("archives preserve required evidence and choose unique names without overwrite", async () => {
  expectAll(all, [
    /requirements, milestones, decisions, blockers, unfinished work, next action, and verification evidence/,
    /`-2`, `-3`/,
    /Never overwrite/,
  ]);

  const dir = await mkdtemp(path.join(os.tmpdir(), "pi-learning-archive-"));
  await mkdir(path.join(dir, "docs/done"), { recursive: true });
  const base = path.join(dir, "docs/done/2026-08-24-parser.md");
  await writeFile(base, "original archive");
  let candidate = base;
  let suffix = 2;
  try {
    for (;;) {
      await writeFile(candidate, "new archive", { flag: "wx" });
      break;
    }
  } catch {
    candidate = path.join(dir, `docs/done/2026-08-24-parser-${suffix}.md`);
    await writeFile(candidate, "new archive", { flag: "wx" });
  }
  assert.equal(await readFile(base, "utf8"), "original archive");
  assert.match(candidate, /parser-2\.md$/);
});

test("hint updates are incremental and non-duplicative", () => {
  expectAll(all, [/smallest useful milestone-specific hint/i, /Refine it or append only novel guidance/, /do not duplicate the section/i]);
});

test("Git ignore setup is worktree-scoped, root-anchored, and idempotent", () => {
  expectAll(all, [
    /git rev-parse --is-inside-work-tree/,
    /git rev-parse --show-toplevel/,
    /Target only `\.gitignore` at that repository root/,
    /\/AGENTS\.md/,
    /\/docs\/current_task\.md/,
    /\/docs\/progress\.md/,
    /\/docs\/hints\.md/,
    /\/docs\/verify\.md/,
    /\/docs\/manifesto\.md/,
    /\/docs\/done\//,
    /leave `\.gitignore` byte-for-byte unchanged/,
    /do not run `git add`/,
    /Repeated invocation must be idempotent/,
  ]);
});
