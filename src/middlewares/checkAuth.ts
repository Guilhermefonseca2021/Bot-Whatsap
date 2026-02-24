import { getAuthStatus } from "../utils/QRcode/generate-whatsapp-QRcode";
import { Request, Response, NextFunction } from "express";

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isAuthenticated = getAuthStatus();

  if (!isAuthenticated) {
    return res.redirect("/start/qr");
  }

  next();
}