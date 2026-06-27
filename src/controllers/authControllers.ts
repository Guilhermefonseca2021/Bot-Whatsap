import path from "node:path";
import { Request, Response } from "express";
import {
  generateQRCodePayload,
  clearQR,
  getCurrentQRImage,
} from "../utils/QRcode/generate-whatsapp-QRcode";
import {
  isAuthenticated,
  setAuthenticated,
} from "../utils/state/whatsapp-state";
import { restartWhatsapp } from "../utils/whatsapp/whatsapp-connection";

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

export async function qrImage(req: Request, res: Response): Promise<void> {
  setAuthenticated(false);
  const image = getCurrentQRImage();

  if (!image) {
    res.status(404).json({
      success: false,
    });
    return;
  }

  res.json({
    success: true,
    image,
  });
}

export async function getQr(req: Request, res: Response): Promise<void> {
  // setAuthenticated(true) // ative caso queira testar a UI
  if (isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  console.log("QR existe?", !!getCurrentQRImage());
  const image = getCurrentQRImage();

  if (!image) {
    return res.sendFile(path.join(process.cwd(), "src/pages/waitingQr.html"));
  }

  return res.sendFile(path.join(process.cwd(), "src/pages/qrcodeAuth.html"));
}

export const logout = async (_req: Request, res: Response) => {
  await restartWhatsapp();

  res.redirect("/start/qr");
};

export async function finalizeAuth(): Promise<void> {
  setAuthenticated(true);

  clearQR();
}

export function checkStatus(req: Request, res: Response) {
  res.json({
    authenticated: isAuthenticated(),
    hasQR: !!getCurrentQRImage(),
  });
}
