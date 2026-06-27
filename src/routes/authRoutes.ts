import { getQr, checkStatus, qrImage } from "../controllers/authControllers";
import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/start/qr", getQr);
authRoutes.get("/qr-image", qrImage)
authRoutes.get("/check-status", checkStatus); 

export default authRoutes;