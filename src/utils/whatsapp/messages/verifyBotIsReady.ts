import { db } from "../../../config/db";
import client from "../client-whatsapp";

export function verifyMyBotIsReady() {
  client.once("ready", async () => {
    console.log("🤖 Bot pronto!");

    const contatos = db.data?.contatos || [];

    for (const contato of contatos) {
      const chatId = `${contato.telefone}@c.us`;

      try {
        await client.sendMessage(
          chatId,
          "Olá! Essa mensagem foi enviada automaticamente 🚀",
        );
        console.log(`✅ Mensagem enviada para ${contato.telefone}`);
      } catch (err) {
        console.error(`❌ Erro ao enviar para ${contato.telefone}`, err);
      }
    }
  });
}
