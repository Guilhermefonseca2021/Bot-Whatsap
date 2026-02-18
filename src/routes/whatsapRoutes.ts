import { Router } from "express";
import { authbot, startQr, getQr, home } from "../controllers/authbot";
import { getAuthStatus } from "../utils/QRcode/generate-whatsapp-QRcode";

const router = Router();

router.get("/auth", authbot);
router.post("/start/qr", startQr);
router.get("/start/qr", getQr);
router.get("/", home);
router.get("/auth-status", (req, res) => {
  res.json({ authenticated: getAuthStatus() });
});

export default router;