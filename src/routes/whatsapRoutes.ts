import { Router } from "express";
import { getQr, dashboard, checkStatus } from "../controllers/authControllers";
import { client } from "../utils/whatsapp/client-whatsapp";
import { handleLog, handleStatus, handleWelcome } from "../controllers/messageControllers";

const router = Router();

router.get("/start/qr", getQr);
router.get("/dashboard", dashboard);
router.get("/check-status", checkStatus); 

export const registerBotRoutes = (): void => {
    client.on('message', async (msg) => {
        const text = msg.body.toLowerCase();
        
        handleLog(msg);

        if (text === 'ajuda' || text === 'help') {
            await handleWelcome(msg);
        } else if (text === '!status') {
            await handleStatus(msg);
        }
    });

    console.log("✅ Rotas de eventos do WhatsApp registradas.");
};

export default router;