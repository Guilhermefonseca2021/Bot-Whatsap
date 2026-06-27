import { Request, Response, NextFunction } from "express";
// import { client } from "../utils/whatsapp/whatsapp-connection"; can check client.info 
import { isAuthenticated } from "../utils/state/whatsapp-state";

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!isAuthenticated()) {
    return res.redirect("/start/qr");
  }

  next();
}
