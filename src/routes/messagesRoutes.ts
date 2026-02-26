import { Router } from "express";
import { sendMessage, sendToMe, messageBoard } from "../controllers/messageControllers";

const messageRoutes = Router();

messageRoutes.post("/send", sendMessage);
messageRoutes.post("/send-to-me", sendToMe);
messageRoutes.get("/", messageBoard);
export default messageRoutes;
