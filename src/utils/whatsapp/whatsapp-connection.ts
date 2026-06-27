import { Client, LocalAuth } from "whatsapp-web.js";
import {
    setCurrentQR,
    setAuthenticated,
    clearSession
} from "../state/whatsapp-state";

import {
    clearQR,
    generateQRCodePayload
} from "../QRcode/generate-whatsapp-QRcode";
import { handleIncomingMessage } from "../../controllers/messageControllers";

export const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bot-session",
        dataPath: "./.wwebjs_auth"
    })
});

client.on("qr", async (qr) => {
  console.log("QR RECEBIDO");
  console.log(qr.substring(0, 30));

  setCurrentQR(qr);
  await generateQRCodePayload(qr);
});

client.on("authenticated", () => {
    setAuthenticated(true);
    setCurrentQR(null);
});

client.on("disconnected", () => {
    setAuthenticated(false);
});

client.initialize();

client.on("message", async (msg) => {
    await handleIncomingMessage(msg);

});

export async function restartWhatsapp() {

    try {
        await client.destroy();
    } catch {}

    clearSession();
    clearQR();

    await client.initialize();

}