import express from "express";
import whatsappConnect from "./utils/whatsapp/whatsapp-connect";
import path from "path";
import client from './utils/whatsapp/client-whatsapp';
import whatsappRoutes from "./routes/whatsapRoutes";
import securityMiddleware from "./middlewares/security";
import { authConfig } from "./config/auth";
import { generateWhatsAppQRcode } from "./utils/QRcode/generate-whatsapp-QRcode";
import helmet from "helmet";
import { initializeDB } from "./config/db";
import { monitorConnectWhatsapp } from "./utils/whatsapp/controllers/authenticate";

const app = express();

whatsappConnect();
generateWhatsAppQRcode();
monitorConnectWhatsapp()
initializeDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", whatsappRoutes);

// segurança / CSP
app.use(securityMiddleware);

app.use("/static", express.static(path.resolve("src/pages")));
app.use(express.static(path.join(__dirname, '../public')));


const handleShutdown = async (signal: string) => {
    console.log(`\nSinal ${signal} recebido. Fechando navegador do WhatsApp...`);
    try {
        await client.destroy();
        console.log("Sessão salva e navegador fechado com sucesso.");
    } catch (error) {
        console.error("Erro ao fechar o cliente:", error);
    } finally {
        process.exit(0);
    }
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

app.use(helmet({ contentSecurityPolicy: false }));

app.listen(authConfig.port, () => {
  console.log(`🔥 Server rodando em http://localhost:${authConfig.port}`);
});
