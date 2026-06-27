import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes";
import { authConfig } from "./config/auth";
import helmet from "helmet";
import { initializeDB } from "./config/db";
import dashboardRoutes from "./routes/dashBoardRoutes";
import messageRoutes from "./routes/messagesRoutes";
import checkAuth from "./middlewares/checkAuth";
const app = express();

initializeDB();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.resolve("public"))); 
app.use("/static", express.static(path.resolve("src/pages")));

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", messageRoutes);


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