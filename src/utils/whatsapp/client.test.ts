import { describe, it } from "node:test";
import assert from "node:assert/strict";
import client from "./client-whatsapp";

describe("WhatsApp client should be defined", () => {
  it("should be defined", () => {
    assert.ok(client);
  });
});
