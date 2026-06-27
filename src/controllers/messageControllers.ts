import { Request, Response } from "express";
import path from "node:path";
import { client } from "../utils/whatsapp/whatsapp-connection";
import { isAuthenticated } from "../utils/state/whatsapp-state";
import { Message } from "whatsapp-web.js";
import { AutoReplyService } from "../service/autoReply.service";
import { db } from "../config/db";

const autoReply = new AutoReplyService();

/**
 * 📄 Página do painel
 */
export async function messageBoard(req: Request, res: Response): Promise<void> {
  return res.sendFile(
    path.join(process.cwd(), "src", "pages", "messagesBoard.html"),
  );
}

export function handleLog(msg: Message): void {
  const now = new Date().toLocaleString();

  console.log(`
====================================
📩 Nova Mensagem
👤 De: ${msg.author || msg.from}
🕒 ${now}
💬 ${msg.body}
====================================
  `);
}

export async function handleIncomingMessage(msg: Message): Promise<void> {
  if (msg.fromMe) return;

  const text = msg.body.trim().toLowerCase();

  // 🔥 hook para logs + IA futura
  handleLog(msg);

  switch (text) {
    case "oi":
    case "olá":
    case "ola":
    case "menu":
    case "ajuda":
      await msg.reply(
        `🤖 *Assistente Virtual*

Escolha uma opção:

1️⃣ Status
2️⃣ Horário
3️⃣ Contato

Ou envie:

*!status*`,
      );
      break;

    case "!status":
      await msg.reply(
        isAuthenticated() ? "✅ Sistema Online." : "⚠️ Sistema Offline.",
      );
      break;

    case "1":
      await msg.reply("✅ O sistema está funcionando normalmente.");
      break;

    case "2":
      await msg.reply(`🕒 Agora são ${new Date().toLocaleTimeString()}`);
      break;

    case "3":
      await msg.reply("📞 Atendimento das 08:00 às 18:00.");
      break;

    default:
      await msg.reply("❓ Não entendi. Digite *ajuda*.");
  }

  await db.read();

  db.data!.mensagens.push({
    from: msg.from,
    to: "me",
    text: msg.body,
    timestamp: Date.now(),
  });

  // 🤖 FUTURO: IA aqui
  // const aiResponse = await autoReply.generate(text)
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
  const { number, message } = req.body;

  if (!number || !message) {
    res.status(400).json({
      success: false,
      message: "Número e mensagem são obrigatórios.",
    });
    return;
  }

  try {
    const chatId = number.replace(/\D/g, "") + "@c.us";

    await client.sendMessage(chatId, message);

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function sendToMe(req: Request, res: Response): Promise<void> {
  try {
    const { message } = req.body;

    const me = client.info.wid._serialized;

    await client.sendMessage(me, message);

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getContacts(req: Request, res: Response): Promise<void> {
  await db.read();

  const mensagens = db.data?.mensagens || [];

  const map = new Map<string, any>();

  for (const msg of mensagens) {
    const id = msg.from;

    if (!map.has(id)) {
      map.set(id, {
        id,
        name: id.replace("@c.us", ""),
        lastMessage: msg.text,
        timestamp: msg.timestamp,
      });
    } else {
      const existing = map.get(id);

      if (msg.timestamp > existing.timestamp) {
        existing.lastMessage = msg.text;
        existing.timestamp = msg.timestamp;
      }
    }
  }

  const contacts = Array.from(map.values()).sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  res.json(contacts);
}

export async function getMessagesByContact(
  req: Request,
  res: Response,
): Promise<void> {
  await db.read();

  const { contactId } = req.params;

  const mensagens = db.data?.mensagens || [];

  const chat = mensagens.filter(
    (m) => m.from === contactId || m.to === contactId,
  );

  res.json(chat);
}
