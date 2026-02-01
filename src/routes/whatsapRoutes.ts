import { Router } from "express";
import { authbot, startQr, getQr, home } from "../controllers/authbot";

const router = Router();

router.get("/auth", authbot);
router.post("/start/qr", startQr);
router.get("/start/qr", getQr);

router.get("/", home);

export default router;
