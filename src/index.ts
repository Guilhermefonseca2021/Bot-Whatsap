import express from "express";
import path from "path";
import whatsappRoutes from "./routes/whatsapRoutes";
import { authConfig } from "./config/auth";
import helmet from "helmet";
import { initializeDB } from "./config/db";
import { startWhatsappConnection } from "./utils/whatsapp/whatsapp-connect"; 
import dashboardRoutes from "./routes/dashBoardRoutes";
import messageRoutes from "./routes/messagesRoutes";
import checkAuth from "./middlewares/checkAuth";
const app = express();

initializeDB();
startWhatsappConnection(); 
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.resolve("public"))); 
app.use("/static", express.static(path.resolve("src/pages")));

app.use("/", whatsappRoutes);
app.use("/", dashboardRoutes);
app.use("/", checkAuth, messageRoutes);


app.listen(authConfig.port, () => {
  console.log(`🔥 Server rodando em http://localhost:${authConfig.port}`);
})
.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Erro: A porta ${authConfig.port} já está em uso.`);
    console.error(`💡 Tente encerrar o processo anterior ou use outra porta.`);
    process.exit(1); // Fecha o script de forma limpa
  } else { 
    console.error('❌ Erro inesperado no servidor:', err);
  }
});