import { Router } from "express";
import path from "path";
import express from "express";

const router = Router();

router.get("/auth", (req, res) => {
  res.sendFile(path.resolve("src/pages/authenticate.html"));
});

router.post("/start/qr", (req, res) => {
  const { phone } = req.body;
  console.log("📞 Número recebido:", phone);

  res.redirect("/qr");
});

router.get("/qr", (req, res) => {
  res.sendFile(path.resolve("src/pages/qrcodeAuth.html"));
});

export default router;
