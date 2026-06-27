import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { client } from "./whatsapp-connection";

describe("WhatsApp client should be defined", () => {
  it("should be defined", () => {
    assert.ok(client);
  });
  it("should have initialize method", () => {
    assert.equal(typeof client.initialize, "function");
  });
});
