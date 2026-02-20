import { Request, Response } from "express";
import client from "../utils/whatsapp/client-whatsapp";
import { db } from "../config/db";

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  const contactsCount = db.data?.contatos.length || 0;
  const state = await client.getState().catch(() => "OFFLINE");
  
  res.json({
    contactsCount,
    status: state === "CONNECTED" ? "Online" : "Desconectado",
    messagesSent: 0 
  });
}