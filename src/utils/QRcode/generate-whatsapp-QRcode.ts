import fs from "fs";
import QRCode from "qrcode";
import client from "../whatsapp/client-whatsapp";

export function generateWhatsAppQRcode() {
  if (!fs.existsSync("./public/imgs")) {
    fs.mkdirSync("./public/imgs", { recursive: true });
  }

  client.on("qr", (qr: string) => {
    console.log("📲 QR recebido");

    const interval = setInterval(() => {
      if (!fs.existsSync("./public/imgs/qrcode.png")) {
        fs.writeFile("./public/imgs/qrcode.png", "", async (err) => {
          if (err) {
            console.error("Erro ao criar arquivo:", err);
            return;
          }

          try {
            await QRCode.toFile("./public/imgs/qrcode.png", qr, {
              width: 200,
              margin: 1,
            });

            console.log(
              "\x1b[36m✅ QR Code gerado com sucesso\x1b[0m",
            );
          } catch (e) {
            console.error("Erro ao gerar QR Code:", e);
          }
        });
      }

      if (fs.existsSync("./public/imgs/qrcode.png")) {
        clearInterval(interval);
      }
    }, 500);
  });
}
