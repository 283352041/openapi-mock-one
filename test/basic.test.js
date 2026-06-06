import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
test("example is valid json", () => assert.equal(JSON.parse(fs.readFileSync("examples/petstore.json", "utf8")).openapi, "3.0.0"));