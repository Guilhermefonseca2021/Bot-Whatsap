import client from "./client-whatsapp";
import { Message } from "whatsapp-web.js";

export default function whatsappConnect() {
  client.on("authenticated", () => {
    console.log("✅ Authenticated");
  });

  client.on("auth_failure", (msg) => {
    console.error("❌ AUTH FAILURE:", msg);
  });

  client.on("ready", async () => {
    console.log("🤖 Bot pronto!");

    const number = "5583998129695";
    const text = "Olá, essa é uma mensagem de teste!";

    const chatId = `${number}@c.us`;

    try {
      await client.sendMessage(chatId, text);
      console.log("📤 Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  }); 

  client.on("message", async (message: Message) => {
    if (message.fromMe) return;

    const text = message.body.toLowerCase();

    if (text === "hello") {
      await message.reply("Hello! How can I assist you today?");
    } else if (text === "help") {
      await message.reply(
        "Comandos disponíveis:\n" + "• hello\n" + "• help\n" + "• info",
      );
    } else if (text === "info") {
      await message.reply("🤖 Bot feito com Node.js + whatsapp-web.js");
    }
  });
  client.initialize();
}
