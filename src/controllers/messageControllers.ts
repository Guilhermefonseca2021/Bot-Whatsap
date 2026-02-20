import { Request, Response } from "express";
import { verifyMyBotIsReady } from "../utils/whatsapp/messages/verifyBotIsReady";
import { landMessageUsersToSent } from "../utils/whatsapp/messages/landMessagesUsertoSent";
import { Message } from "whatsapp-web.js";

export function verifyBot(req: Request, res: Response) {
  verifyMyBotIsReady();
  res.status(200).json({ message: "Verificação do bot iniciada..." });
}

export function sendAutoMessages(req: Request, res: Response) { 
  landMessageUsersToSent();
  res.status(200).json({ message: "Envio automático de mensagens iniciado..." });
}

export const handleWelcome = async (message: Message): Promise<void> => {
    await message.reply('Olá! Este bot usa apenas funções exportadas.');
};

export const handleStatus = async (message: Message): Promise<void> => {
    await message.reply('Sistema operando 100% em modo funcional.');
};

export const handleLog = (message: Message): void => {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);
};