import { Request, Response } from "express";
import path from "path";
import { setAuthStatus } from "../utils/QRcode/generate-whatsapp-QRcode";

export const index = (req: Request, res: Response): void => {
  res.sendFile(
    path.join(process.cwd(), "src", "pages", "dashboard.html")
  );
};

export const listContacts = (req: Request, res: Response): void => {
  res.send("<h1>Lista de Contatos</h1>");
};

export const logout = (req: Request, res: Response): void => {
  setAuthStatus(false); 

  res.redirect("/start/qr");
};