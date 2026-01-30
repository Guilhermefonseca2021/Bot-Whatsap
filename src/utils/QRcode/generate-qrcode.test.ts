import { describe, it } from "node:test";
import fs from "fs";
import { assert } from "console";

describe("generateWhatsAppQRcode", () => {
  it("should create the file", () => {
    if (!fs.existsSync("./public/imgs")) {
      fs.mkdirSync("./public/imgs", { recursive: true });
    }

    assert(fs.existsSync("./public/imgs"), "Directory ./public/imgs should exist");
  });
});
