import express from "express";
import path from "path";
import whatsappRoutes, { registerBotRoutes } from "./routes/whatsapRoutes";
import securityMiddleware from "./middlewares/security";
import { authConfig } from "./config/auth";
import helmet from "helmet";
import { initializeDB } from "./config/db";
import { startWhatsappConnection } from "./utils/whatsapp/whatsapp-connect"; 
const app = express();

initializeDB();
registerBotRoutes();
startWhatsappConnection(); 
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.resolve("public"))); 
app.use("/static", express.static(path.resolve("src/pages")));

app.use("/", whatsappRoutes);
app.use(securityMiddleware);


app.listen(authConfig.port, () => {
  console.log(`🔥 Server rodando em http://localhost:${authConfig.port}`);
});