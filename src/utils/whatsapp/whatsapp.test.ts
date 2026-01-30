import { describe, it } from "node:test";
import assert from "node:assert/strict";
import client from "./client-whatsapp";

describe("WhatsApp client should have an initialize method", () => {
  it("should have initialize method", () => {
    assert.equal(typeof client.initialize, "function");
  });
});
