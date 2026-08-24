import { appendFileSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const semverPattern =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

export function validateRelease(pkg, tag) {
  if (pkg.private === true) throw new Error("package.json is private");
  if (typeof pkg.name !== "string" || pkg.name.length === 0)
    throw new Error("package.json has no package name");
  if (typeof pkg.version !== "string" || !semverPattern.test(pkg.version)) {
    throw new Error(`Invalid package version: ${pkg.version}`);
  }
  if (tag !== `v${pkg.version}`) {
    throw new Error(
      `Release tag ${tag} must exactly match package version v${pkg.version}`,
    );
  }

  return {
    name: pkg.name,
    version: pkg.version,
    distTag: pkg.version.includes("-") ? "next" : "latest",
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    const release = validateRelease(pkg, process.env.RELEASE_TAG);
    const output = `name=${release.name}\nversion=${release.version}\ndist_tag=${release.distTag}\n`;

    if (!process.env.GITHUB_OUTPUT) throw new Error("GITHUB_OUTPUT is not set");
    appendFileSync(process.env.GITHUB_OUTPUT, output);
    console.log(
      `Validated ${release.name}@${release.version}; npm dist-tag: ${release.distTag}`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
