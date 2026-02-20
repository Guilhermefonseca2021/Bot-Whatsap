import path from "path";
import { Request, Response } from "express";
import { generateQRCodePayload, getAuthStatus, setAuthStatus } from "../utils/QRcode/generate-whatsapp-QRcode";
import { getCurrentQR } from "../utils/whatsapp/whatsapp-connect";
import * as fs from "fs";

const qrPath = path.resolve("public/qrcode.png");

export const cleanAndGenerateQR = async (qr: string): Promise<void> => {
    try {
        generateQRCodePayload(qr);
        
        console.log("✅ Imagem QR gerada com sucesso.");
    } catch (err) {
        console.error("❌ Erro ao gerar QR:", err);
    }
};

export const finalizeAuth = (): void => {
    setAuthStatus(true);

    if (fs.existsSync(qrPath)) {
        fs.unlinkSync(qrPath);
        console.log("Arquivo de QR Code limpo após autenticação.");
    }
};

export async function getQr(req: Request, res: Response): Promise<void> {
    if (getAuthStatus()) {
        res.redirect("/dashboard");
        return;
    }

    if (!getCurrentQR()) {
        res.sendFile(path.resolve("src/pages/waitingQr.html"));
        return;
    }

    res.sendFile(path.resolve("src/pages/qrcodeAuth.html"));
}

export function dashboard(req: Request, res: Response): void {
    if (!getAuthStatus()) {
        res.redirect("/start/qr"); 
        return;
    }
    res.sendFile(path.resolve("src/pages/dashboard.html"));
}

export function checkStatus(req: Request, res: Response): void {
    const hasQR = getCurrentQR() !== null;
    const isAuth = getAuthStatus();
    
    res.json({ 
        hasQR: hasQR,
        authenticated: isAuth 
    });
}