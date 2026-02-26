import { Request, Response } from "express";
import path from "node:path";
import { Message } from "whatsapp-web.js";
import { client } from "../utils/whatsapp/client-whatsapp";
import { getAuthStatus } from "../utils/whatsapp/whatsapp-connect";

export async function messageBoard(req: Request, res: Response): Promise<void> {
  if (!getAuthStatus()) {
    return res.redirect("/start/qr");
  }

  return res.sendFile(
    path.join(process.cwd(), "src", "pages", "messagesBoard.html"),
  );
}


export function handleLog(msg: Message): void {
    const time = new Date().toLocaleTimeString();
    const from = msg.author || msg.from;
    console.log(`[${time}] Mensagem de ${from}: ${msg.body}`);
}

export async function handleWelcome(msg: Message): Promise<void> {
    const welcomeText = 
        "Olá! Sou o assistente virtual. 🤖\n\n" +
        "Como posso ajudar? Digite um dos comandos abaixo:\n" +
        "📍 *!status* - Para verificar minha conexão.\n" +
        "📍 *ajuda* - Para ver esta mensagem novamente.";
    
    await msg.reply(welcomeText);
}

export async function handleStatus(msg: Message): Promise<void> {
  if (getAuthStatus()) {
    await msg.reply(`Status do Sistema: ✅ Conectado`);
  } else {
    await msg.reply("Status do Sistema: ⚠️ Desconectado");
  }
}

export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res
      .status(400)
      .json({ error: "Número e mensagem são obrigatórios." });
  }

  try {
    let formattedNumber = number.replace(/\D/g, "");

    if (!formattedNumber.endsWith("@c.us")) {
      formattedNumber = `${formattedNumber}@c.us`;
    }

    await client.sendMessage(formattedNumber, message);

    console.log(`✅ Mensagem enviada para: ${formattedNumber}`);
    return res
      .status(200)
      .json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error: any) {
    console.error("❌ Erro ao enviar mensagem:", error);
    return res
      .status(500)
      .json({ error: "Falha ao enviar mensagem.", details: error.message });
  }
};

export const sendToMe = async (req: Request, res: Response): Promise<any> => {
  const { message } = req.body;

  try {
    const myId = client.info.wid._serialized; // Pega o ID do bot logado
    await client.sendMessage(myId, message);

    return res
      .status(200)
      .json({ success: true, message: "Teste enviado para você mesmo!" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erro no teste", details: error.message });
  }
};
