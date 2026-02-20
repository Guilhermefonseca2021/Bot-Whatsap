import fs from "fs";
import QRCode from "qrcode";
import client from "../whatsapp/client-whatsapp";

let globalQR = "";
let isAuthenticated = false;

export const setCurrentQR = (qr: string) => {
  globalQR = qr;
};

export const getCurrentQR = () => globalQR;

export const getAuthStatus = () => isAuthenticated;

export const setAuthStatus = (status: boolean) => {
  isAuthenticated = status;
};

export function generateWhatsAppQRcode() {
  const dir = "./public/imgs";
  const pathFile = `${dir}/qrcode.png`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 🔹 QR RECEBIDO
  client.on("qr", (qr: string) => {
    console.log("📲 QR recebido");
    setCurrentQR(qr);
    setAuthStatus(false);

    if (fs.existsSync(pathFile)) {
      try {
        fs.unlinkSync(pathFile);
      } catch (err) {
        console.error("Erro ao limpar QR antigo:", err);
      }
    }

    QRCode.toFile(
      pathFile,
      qr,
      {
        width: 250,
        margin: 1
      },
      (err) => {
        if (err) {
          console.error("Erro ao salvar qrcode.png:", err);
        } else {
          console.log("✅ QR Code salvo com sucesso");
        }
      }
    );
  });

  // 🔹 QUANDO ESTIVER PRONTO
  client.on("ready", () => {
    console.log("🤖 WhatsApp pronto!");
    setAuthStatus(true);
    setCurrentQR("");

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
      console.log("🧹 QR removido após autenticação");
    }
  });

  // 🔹 SE DESCONECTAR
  client.on("disconnected", () => {
    console.log("❌ WhatsApp desconectado");
    setAuthStatus(false);
  });
}