import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const expectedPrompts = [
  "new-learning-project",
  "add-new-learning-task",
  "give-learning-hint",
  "verify-learning-step",
  "archive-learning-task",
  "gitignore-learning-docs",
];

assert.equal(pkg.name, "pi-learning-workflow");
assert.equal(pkg.license, "MIT");
assert.equal(pkg.author.url, "https://www.npmjs.com/~sinaba96");
assert.equal(
  pkg.repository.url,
  "git+https://github.com/sina96/pi-learning-workflow.git",
);
assert.deepEqual(pkg.publishConfig, { access: "public", provenance: true });
assert.notEqual(pkg.private, true);
assert.equal(pkg.scripts.prepublishOnly, "pnpm check && pnpm test");
assert.ok(pkg.keywords.includes("pi-package"));
assert.deepEqual(
  pkg.pi.extensions,
  undefined,
  "an extension should not be registered",
);
assert.deepEqual(
  pkg.pi.prompts.map((file) => path.basename(file, ".md")),
  expectedPrompts,
  "manifest must register exactly the six workflow commands",
);
assert.deepEqual(pkg.pi.skills, ["./skills/pi-learning-workflow/SKILL.md"]);

for (const resource of [...pkg.pi.skills, ...pkg.pi.prompts]) {
  assert.ok(
    resource.startsWith("./"),
    `resource must be package-relative: ${resource}`,
  );
  await access(path.join(root, resource));
}

const skill = await readFile(path.join(root, pkg.pi.skills[0]), "utf8");
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
assert.ok(frontmatter, "SKILL.md needs YAML frontmatter");
const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1];
const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1];
assert.equal(name, "pi-learning-workflow");
assert.match(name, /^(?!-)(?!.*--)[a-z0-9-]{1,64}(?<!-)$/);
assert.ok(description && description.length <= 1024);

for (const promptPath of pkg.pi.prompts) {
  const content = await readFile(path.join(root, promptPath), "utf8");
  assert.match(
    content,
    /^---\n[\s\S]*?\n---\n/,
    `${promptPath} needs frontmatter`,
  );
  assert.match(content, /Load and follow the `pi-learning-workflow` skill/);
}

const forbiddenCommands = new Set([
  "new",
  "verify",
  "hint",
  "add-task",
  "archive",
]);
for (const file of await readdir(path.join(root, "prompts"))) {
  assert.ok(file.endsWith(".md"));
  assert.ok(
    !forbiddenCommands.has(path.basename(file, ".md")),
    `generic command found: ${file}`,
  );
}
assert.deepEqual(
  (await readdir(path.join(root, "prompts"))).sort(),
  expectedPrompts.map((x) => `${x}.md`).sort(),
);

const rootEntries = await readdir(root);
assert.ok(
  !rootEntries.includes("docs"),
  "package resources and documentation must not be nested under docs/",
);
assert.ok(rootEntries.includes("README.md"));
assert.ok(rootEntries.includes("LICENSE"));
assert.match(
  await readFile(path.join(root, "LICENSE"), "utf8"),
  /^MIT License/,
);

const readme = await readFile(path.join(root, "README.md"), "utf8");
assert.match(readme, /^# pi-learning-workflow\n\n\[!\[CI\]/);
assert.match(readme, /actions\/workflows\/ci\.yml\/badge\.svg/);
assert.match(readme, /img\.shields\.io\/npm\/v\/pi-learning-workflow/);
assert.match(readme, /npmjs\.com\/package\/pi-learning-workflow/);
assert.match(readme, /pi install npm:pi-learning-workflow/);
assert.doesNotMatch(readme, /^## Publishing$/m);
const ci = await readFile(path.join(root, ".github/workflows/ci.yml"), "utf8");
assert.match(ci, /actions\/checkout@v6/);
assert.match(ci, /actions\/setup-node@v6/);
assert.match(ci, /node-version: 24/);
assert.match(ci, /pnpm check/);
assert.match(ci, /pnpm test/);

const publish = await readFile(
  path.join(root, ".github/workflows/publish.yml"),
  "utf8",
);
assert.match(publish, /tags:\n\s+- "v\*"/);
assert.match(publish, /id-token: write/);
assert.match(publish, /actions\/checkout@v6/);
assert.match(publish, /actions\/setup-node@v6/);
assert.match(publish, /node-version: 24/);
assert.match(publish, /package-manager-cache: false/);
assert.doesNotMatch(publish, /^\s+cache:\s/m);
assert.match(publish, /node scripts\/validate-release\.mjs/);
assert.match(
  publish,
  /git merge-base --is-ancestor "\$GITHUB_SHA" origin\/main/,
);
assert.match(publish, /is already published/);
assert.match(publish, /pnpm check/);
assert.match(publish, /pnpm test/);
assert.match(publish, /pnpm dlx npm@11\.19\.0 publish/);
assert.match(publish, /secrets\.NPM_TOKEN/);
assert.match(publish, /Publish with npm trusted publishing/);

const releaseValidator = await readFile(
  path.join(root, "scripts/validate-release.mjs"),
  "utf8",
);
assert.match(releaseValidator, /tag !== `v\$\{pkg\.version\}`/);
assert.match(
  releaseValidator,
  /pkg\.version\.includes\("-"\) \? "next" : "latest"/,
);

console.log(
  `Validated ${pkg.pi.skills.length} skill and ${pkg.pi.prompts.length} exact prompt templates.`,
);
