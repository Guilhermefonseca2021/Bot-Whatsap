import { Router } from "express";
import path from "path";
import express from "express";
import client from "../utils/whatsapp/client-whatsapp";

const router = Router();
let currentQR: string | null = null;

client.on("qr", (qr: string) => {
  currentQR = qr;
  console.log("📸 QR Code atualizado");
});

router.get("/auth", (req, res) => {
  res.sendFile(path.resolve("src/pages/authenticate.html"));
});

router.post("/start/qr", (req, res) => {
  const { phone } = req.body;
  console.log("📞 Número recebido:", phone);

  res.redirect("/qr");
});

router.get("/qr", (req, res) => {
  if (!currentQR) {
    res.sendStatus(204);
    return;
  }

  res.sendFile(path.resolve("src/pages/qrcodeAuth.html"));
});

export default router;
