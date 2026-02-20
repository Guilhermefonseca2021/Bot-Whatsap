import path from "path";
import { Request, Response } from "express";
import { db } from "../config/db";
import client from "../utils/whatsapp/client-whatsapp";
import {
  setCurrentQR,
  getCurrentQR,
  getAuthStatus
} from "../utils/QRcode/generate-whatsapp-QRcode";

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

export function checkStatus(req: Request, res: Response): void {
  const isAuth = getAuthStatus();
  res.json({ authenticated: isAuth });
}

export async function getQr(req: Request, res: Response): Promise<void> {
  // NÃO FAZ LOGOUT AQUI
  // NÃO REINICIALIZA AQUI

  if (getAuthStatus()) {
    res.redirect("/");
    return;
  }

  if (!getCurrentQR()) {
    res.sendFile(path.resolve("src/pages/waitingQr.html"));
    return;
  }

  res.sendFile(path.resolve("src/pages/qrcodeAuth.html"));
}

export function home(req: Request, res: Response): void {
  res.sendFile(path.resolve("src/pages/home.html"));
}