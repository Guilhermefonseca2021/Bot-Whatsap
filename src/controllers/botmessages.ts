import { Request, Response } from "express";
import { verifyMyBotIsReady } from "../utils/whatsapp/messages/verifyBotIsReady";
import { landMessageUsersToSent } from "../utils/whatsapp/messages/landMessagesUsertoSent";

export function verifyBot(req: Request, res: Response) {
  verifyMyBotIsReady();
  res.status(200).json({ message: "Verificação do bot iniciada..." });
}

export function sendAutoMessages(req: Request, res: Response) { 
  landMessageUsersToSent();
  res.status(200).json({ message: "Envio automático de mensagens iniciado..." });
}