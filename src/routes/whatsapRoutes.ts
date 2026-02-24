import { getQr, checkStatus } from "../controllers/authControllers";
import { Router } from "express";

const whatsappRoutes = Router();

whatsappRoutes.get("/start/qr", getQr);
whatsappRoutes.get("/check-status", checkStatus); 

export default whatsappRoutes;