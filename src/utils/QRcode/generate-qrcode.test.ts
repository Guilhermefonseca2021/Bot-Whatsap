import { describe, it } from "node:test";
import fs from "fs";
import { assert } from "console";
import QRCode from "qrcode";
import client from "../whatsapp/client-whatsapp";

describe("generateWhatsAppQRcode", async () => {
  it("should create the file", () => {
    if (!fs.existsSync("./public/imgs")) {
      fs.mkdirSync("./public/imgs", { recursive: true });
    }

    assert(
      fs.existsSync("./public/imgs"),
      "Directory ./public/imgs should exist",
    );
  });
  it("should generate a QR code image file", async () => {
    client.on("qr", async (qr: string) => {
      const qrCodeData = "Sample QR Code Data";
      await QRCode.toFile("./public/imgs/qrcode.png", qr, {
        width: 200,
        margin: 1,
      });

      fs.writeFileSync("./public/imgs/qrcode.png", qrCodeData);
    });
    assert(
      fs.existsSync("./public/imgs/qrcode.png"),
      "QR code image file should be created",
    );
  });
});
