import path from "path";
import client from "../utils/whatsapp/client-whatsapp";
import { Request, Response } from "express";
import { db } from "../config/db";

let currentQR: string | null = null;

client.on("qr", (qr: string) => {
  currentQR = qr;
  console.log("📸 QR Code atualizado");
});

export const authbot = (req: Request, res: Response): void => {
  res.sendFile(path.resolve("src/pages/authenticate.html"));
};

export async function startQr(req: Request, res: Response): Promise<void> {
  const { phone } = req.body;

  if (!phone) {
    res.status(400).send("Telefone é obrigatório");
    return;
  }

  const exists = db.data?.contatos.some((c) => c.telefone === phone);

  if (!exists) {
    db.data?.contatos.push({ telefone: phone });
    await db.write();
  }
  res.redirect("/start/qr");
}

export const getQr = (req: Request, res: Response): void => {
  if (!currentQR) {
    res.sendStatus(204);
    return;
  }

  res.sendFile(path.resolve("src/pages/qrcodeAuth.html"));
};
