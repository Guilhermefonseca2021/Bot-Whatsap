// import { Message } from "whatsapp-web.js";
// import { client } from "../client-whatsapp";

// export function registerBotEvents(): void {

//     client.removeAllListeners("message"); // evita duplicação

//     client.on("message", async (msg: Message) => {
//         try {
//             const text = msg.body?.toLowerCase() || "";

//             handleLog(msg);

//             if (text === "ajuda" || text === "help") {
//                 await handleWelcome(msg);
//             } 
            
//             else if (text === "!status") {
//                 await handleStatus(msg);
//             }

//         } catch (error) {
//             console.error("❌ Erro ao processar mensagem:", error);
//         }
//     });

//     console.log("✅ Eventos do WhatsApp registrados.");
// }