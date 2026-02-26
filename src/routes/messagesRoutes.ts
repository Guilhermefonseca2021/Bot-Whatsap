import { Router } from "express";
import { sendMessage, sendToMe } from "../controllers/messageControllers";

const messageRoutes = Router();

messageRoutes.post("/send", sendMessage);
messageRoutes.post("/send-to-me", sendToMe);

export default messageRoutes;
