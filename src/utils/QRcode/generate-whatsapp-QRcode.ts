import fs from "fs";
import QRCode from "qrcode";
import client from "../whatsapp/client-whatsapp";

let globalQR = "";
let isAuthenticated = false;

export const setCurrentQR = (qr: string) => { globalQR = qr; };
export const getCurrentQR = () => globalQR;
export const getAuthStatus = () => isAuthenticated;
export const setAuthStatus = (status: boolean) => { isAuthenticated = status; };

export function generateWhatsAppQRcode() {
  const dir = "./public/imgs";
  const pathFile = `${dir}/qrcode.png`;

  // Garante que o diretório existe logo no início
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  client.on("qr", (qr: string) => {
    console.log("📲 QR recebido, processando arquivo...");
    setCurrentQR(qr);

    if (fs.existsSync(pathFile)) {
      try {
        fs.unlinkSync(pathFile);
      } catch (err) {
        console.error("Erro ao limpar QR antigo:", err);
      }
    }

    QRCode.toFile(pathFile, qr, {
      width: 250,
      margin: 1
    }, (err) => {
      if (err) {
        console.error("Erro ao salvar qrcode.png:", err);
      } else {
        console.log("\x1b[36m✅ QR Code físico atualizado com sucesso\x1b[0m");
      }
    });
  });

  client.on("authenticated", () => {
    isAuthenticated = true;
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
      console.log("🧹 Arquivo de QR Code removido após autenticação.");
    }
  });
}
