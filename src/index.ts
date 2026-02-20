import express from "express";
import whatsappConnect from "./utils/whatsapp/whatsapp-connect";
import path from "path";
import whatsappRoutes from "./routes/whatsapRoutes";
import securityMiddleware from "./middlewares/security";
import { authConfig } from "./config/auth";
import helmet from "helmet";
import { initializeDB } from "./config/db";
import { monitorConnectWhatsapp } from "./utils/whatsapp/controllers/authenticate";

const app = express();

initializeDB();
monitorConnectWhatsapp();
whatsappConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", whatsappRoutes);

app.use(securityMiddleware);

app.use("/static", express.static(path.resolve("src/pages")));
app.use(express.static(path.join(__dirname, "../public")));

app.use(helmet({ contentSecurityPolicy: false }));

app.listen(authConfig.port, () => {
  console.log(`🔥 Server rodando em http://localhost:${authConfig.port}`);
});