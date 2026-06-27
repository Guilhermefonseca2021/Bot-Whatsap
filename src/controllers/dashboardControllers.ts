import { Request, Response } from "express";
import path from "path";
import {
  setAuthenticated,
} from "../utils/state/whatsapp-state";

export function dashboard(req: Request, res: Response): void {
  res.sendFile(
    path.join(process.cwd(), "src", "pages", "dashboard.html")
  );
}

export const listContacts = (_req: Request, res: Response): void => {
  res.sendFile(
    path.join(process.cwd(), "src", "pages", "messagesBoard.html")
  );
};

export const logout = (_req: Request, res: Response): void => {
  setAuthenticated(false);

  res.redirect("/start/qr");
};