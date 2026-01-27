import fs from "fs";
import QRcode from "qrcode";
import client from "../whatsapp/client-whatsapp";

export function generateWhatsAppQRcode() {
  client.on("qr", async (qr: string) => {
    await QRcode.toFile("./public/imgs/qrcode.png", qr, {
      width: 200,
      margin: 1,
    });
    if (fs.existsSync("./public/imgs/qrcode.png")) {
      // Asynchronously writes data to a file, replacing the file if it already exists.
      fs.writeFile("./public/imgs/qrcode.png", qr, async (err) => {
        await QRcode.toFile("./public/imgs/qrcode.png", qr, {
          width: 200,
          margin: 1,
        });
        if (err) {
          console.error("Erro ao salvar o QR Code:", err);
        }
      });
      console.log(
        "\x1b[36m✅ QR Code gerado com sucesso em ./public/imgs/qrcode.png \x1b[0m ",
      );
    } else {
      console.log("\x1b[32m 📲 Escaneie o QR Code com o WhatsApp \x1b[0m ");
    }
  });
}
