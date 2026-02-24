import path from "path";
import { Request, Response } from "express";
import {
  generateQRCodePayload,
  getAuthStatus,
  setAuthStatus,
} from "../utils/QRcode/generate-whatsapp-QRcode";
import { getCurrentQR } from "../utils/whatsapp/whatsapp-connect";
import * as fs from "fs/promises";

const qrPath = path.join(process.cwd(), "public", "qrcode.png");

export const cleanAndGenerateQR = async (qr: string): Promise<void> => {
  try {
    if (!qr) {
      console.warn("⚠️ QR inválido recebido.");
      return;
    }

    await generateQRCodePayload(qr);

    console.log("✅ Imagem QR gerada com sucesso.");
  } catch (err) {
    console.error("❌ Erro ao gerar QR:", err);
  }
};

export const finalizeAuth = async (): Promise<void> => {
  setAuthStatus(true);

  try {
    await fs.unlink(qrPath);
    console.log("🧹 QR Code removido após autenticação.");
  } catch (err) {
  }
};

export async function getQr(req: Request, res: Response): Promise<void> {
  if (getAuthStatus()) {
    return res.redirect("/dashboard");
  }

  const currentQR = getCurrentQR();

  if (!currentQR) {
    return res.sendFile(
      path.join(process.cwd(), "src", "pages", "waitingQr.html")
    );
  }

  return res.sendFile(
    path.join(process.cwd(), "src", "pages", "qrcodeAuth.html")
  );
}

export function dashboard(req: Request, res: Response): void {
  if (!getAuthStatus()) {
    return res.redirect("/start/qr");
  }

  res.sendFile(
    path.join(process.cwd(), "src", "pages", "dashboard.html")
  );
}

export function checkStatus(req: Request, res: Response): void {
  const currentQR = getCurrentQR();
  const isAuth = getAuthStatus();

  res.json({
    hasQR: !!currentQR,
    authenticated: isAuth,
  });
}