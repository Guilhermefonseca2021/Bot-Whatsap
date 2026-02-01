import path from "path";
import { Request, Response } from "express";
import { db } from "../config/db";
import {
  getAuthStatus,
  getCurrentQR,
  setCurrentQR
} from "../utils/whatsapp/controllers/authenticate";
import client from "../utils/whatsapp/client-whatsapp";

client.on("qr", (qr: string) => {
  setCurrentQR(qr);
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

export function getQr(req: Request, res: Response): void {
  if (getAuthStatus()) {
    res.redirect("/");
    return;
  }

  if (!getCurrentQR()) {
    res.sendFile(path.resolve("src/pages/waitingQr.html"));
    return;
  }

  res.sendFile(path.resolve("src/pages/qrcodeAuth.html"));
};

export function home(req: Request, res: Response): void {
    res.sendFile(path.resolve("src/pages/home.html"));
  
}