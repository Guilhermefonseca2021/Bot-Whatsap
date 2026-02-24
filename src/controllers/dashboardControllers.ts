import { Request, Response } from "express";
import path from "path";
import { getAuthStatus, setAuthStatus } from "../utils/QRcode/generate-whatsapp-QRcode";

export function dashboard(req: Request, res: Response): void {
  if (!getAuthStatus()) {
    return res.redirect("/start/qr");
  }

  res.sendFile(
    path.join(process.cwd(), "src", "pages", "dashboard.html")
  );
}

export const listContacts = (req: Request, res: Response): void => {
  res.send("<h1>Lista de Contatos</h1>");
};

export const logout = (req: Request, res: Response): void => {
  setAuthStatus(false); 

  res.redirect("/start/qr");
};