import express from "express";
import whatsappConnect from "./utils/whatsapp/whatsapp-connect";
import path from "path";
import whatsappRoutes from "./routes/whatsapRoutes";
import securityMiddleware from "./middlewares/security";
import { authConfig } from "./config/auth";
import { generateWhatsAppQRcode } from "./utils/QRcode/generate-whatsapp-QRcode";
import helmet from "helmet";

const app = express();

whatsappConnect();
generateWhatsAppQRcode();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", whatsappRoutes);

// segurança / CSP
app.use(securityMiddleware);

// arquivos estáticos (se precisar)
app.use("/static", express.static(path.resolve("src/pages")));
app.use(express.static(path.resolve("../../public")));

app.use(helmet({ contentSecurityPolicy: false }));

app.listen(authConfig.port, () => {
  console.log(`🔥 Server rodando em http://localhost:${authConfig.port}`);
});
