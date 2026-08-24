import assert from "node:assert/strict";
import test from "node:test";
import { validateRelease } from "../scripts/validate-release.mjs";

const basePackage = { name: "pi-learning-workflow", version: "0.1.0" };

test("accepts an exact stable release tag and selects latest", () => {
  assert.deepEqual(validateRelease(basePackage, "v0.1.0"), {
    name: "pi-learning-workflow",
    version: "0.1.0",
    distTag: "latest",
  });
});

test("accepts an exact prerelease tag and selects next", () => {
  assert.deepEqual(
    validateRelease(
      { ...basePackage, version: "1.0.0-beta.1" },
      "v1.0.0-beta.1",
    ),
    {
      name: "pi-learning-workflow",
      version: "1.0.0-beta.1",
      distTag: "next",
    },
  );
});

test("rejects a tag that does not exactly match package version", () => {
  assert.throws(
    () => validateRelease(basePackage, "v0.2.0"),
    /must exactly match package version v0\.1\.0/,
  );
});

test("rejects private packages and invalid versions", () => {
  assert.throws(
    () => validateRelease({ ...basePackage, private: true }, "v0.1.0"),
    /private/,
  );
  assert.throws(
    () => validateRelease({ ...basePackage, version: "latest" }, "vlatest"),
    /Invalid package version/,
  );
});
