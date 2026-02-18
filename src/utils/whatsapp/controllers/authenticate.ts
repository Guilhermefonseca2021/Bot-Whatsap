import { setCurrentQR, setAuthStatus } from "../../QRcode/generate-whatsapp-QRcode";
import client from "../client-whatsapp";

export function monitorConnectWhatsapp() {
  client.on("ready", async () => {
    setAuthStatus(true);
    setCurrentQR(""); 

    try {
      // Pega o seu próprio número ou o número que acabou de conectar
      const myNumber = client.info.wid._serialized;
      
      await client.sendMessage(myNumber, "Olá! Bem-vindo. Serei seu assistente.");
      console.log("✅ Mensagem de boas-vindas enviada e status atualizado.");
    } catch (error) {
      console.error("Erro ao enviar mensagem inicial:", error);
    }
  });

  client.on("disconnected", () => {
    setAuthStatus(false);
  });
}