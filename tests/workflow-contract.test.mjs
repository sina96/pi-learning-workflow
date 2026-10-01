import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");
const skill = await read("skills/pi-learning-workflow/SKILL.md");
const operations = await read("skills/pi-learning-workflow/references/workflow-operations.md");
const templates = await read("skills/pi-learning-workflow/references/project-templates.md");
const migration = await read("skills/pi-learning-workflow/references/migration.md");
const all = [skill, operations, templates, migration].join("\n");

function expectAll(text, patterns) {
  for (const pattern of patterns) assert.match(text, pattern);
}

test("tracker has a compact index and authoritative per-issue state", () => {
  expectAll(templates, [
    /\.learning\/index\.md/,
    /issues\/T001\.md/,
    /Focus: none/,
    /status authority/i,
    /captured issue/i,
    /Original idea/,
    /Acceptance criteria/,
    /Learning focus/,
    /few bounded outcomes/i,
  ]);
});

test("session starts and ordinary coaching are quiet and read-only", () => {
  expectAll(skill, [
    /Do not automatically recap, inspect project files, run checks, or write tracking files/i,
    /ordinary coaching and discussion are read-only/i,
    /Match requested help depth: hint, explanation, or walkthrough/i,
    /Being stuck repeatedly is not permission/i,
  ]);
  expectAll(operations, [
    /ordinary hints, explanations, walkthroughs, and discussion do not change files/i,
    /When the learner asks to resume, read `\.learning\/index\.md`/,
    /label saved statements as recorded/i,
  ]);
});

test("capture, start, and switch are distinct and preserve unfinished work", () => {
  expectAll(operations, [
    /“Save this idea,”[\s\S]*?Do not demand criteria, choose focus, or alter current focus/i,
    /“Let's work on\/start this”[\s\S]*?acceptance criteria, learning focus, and a few light milestones/i,
    /ask whether to pause it and switch focus, or queue this issue and keep the current focus/i,
    /Do not change focus until the learner chooses/i,
    /No archive is required to create or start another issue/i,
  ]);
});

test("meaningful progress retains provenance and does not become a journal", () => {
  expectAll(all, [
    /Save only meaningful milestones, blockers, and decisions/i,
    /learner-reported is not agent-observed or verified/i,
    /Do not turn conversations into a transcript/i,
    /A user report is not agent verification/i,
  ]);
});

test("verification records evidence without implementation edits or automatic closure", () => {
  expectAll(operations, [
    /Do not edit implementation, tests, configuration, formatting, dependencies, or generated implementation/i,
    /passed`, `failed`, `partial`, or `blocked`/,
    /Never infer untested acceptance criteria from a passing build/i,
    /Verification records evidence but does not close the issue/i,
    /Never fix failures unless separately asked/i,
  ]);
  expectAll(templates, [
    /Latest evidence/,
    /code changes after verification/i,
    /`done` requires learner confirmation/i,
  ]);
});

test("migration requires explicit approval, preserves originals, and validates before activation", () => {
  expectAll(migration, [
    /only when the learner explicitly requests migration or approves/i,
    /Inspect read-only/i,
    /Ask for approval of this specific plan before writing/i,
    /Preserve originals byte-for-byte/i,
    /Old checkboxes and optimistic statements are legacy-reported status/i,
    /Stage and validate/i,
    /Activate only after validation/i,
    /rollback/i,
    /Do not infer focus from list order/i,
  ]);
});

test("ignore rules are additive and never untrack files", () => {
  expectAll(operations, [
    /root-anchored entries[\s\S]*?`\/\.learning\/`/,
    /append only missing rules, idempotently/i,
    /Do not remove tracked files from the index/i,
  ]);
});
