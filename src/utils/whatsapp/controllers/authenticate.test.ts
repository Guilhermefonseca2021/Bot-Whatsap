import { describe, it } from "node:test";
import assert from "node:assert";
import { getAuthStatus } from "./authenticate";

describe("getAuthStatus", () => {
  it("should return false when not authenticated", () => {
    const status = getAuthStatus();
    assert.strictEqual(status, false);
  });
});
