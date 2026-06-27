import { Router } from "express";
import {
  sendMessage,
  sendToMe,
  messageBoard,
  getContacts,
  getMessagesByContact
} from "../controllers/messageControllers";

const messageRoutes = Router();

/**
 * 📩 Enviar mensagem via WhatsApp bot
 */
messageRoutes.post("/send", sendMessage);

/**
 * 🧪 Enviar mensagem para si mesmo (debug/teste)
 */
messageRoutes.post("/send-to-me", sendToMe);

/**
 * 📊 Painel geral de mensagens
 */
messageRoutes.get("/messages", messageBoard);

/**
 * 👥 Lista de contatos (dinâmico vindo do controller)
 */
messageRoutes.get("/contacts", getContacts);

/**
 * 💬 Mensagens por contato
 */
messageRoutes.get("/messages/:contactId", getMessagesByContact);

export default messageRoutes;