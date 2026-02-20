import * as fs from "fs";
import * as path from "path";
import QRCode from "qrcode"; // Use apenas uma importação

let currentQR: string | null = null;
const sessionState = { isAuthenticated: false };

const qrPath = path.resolve(process.cwd(), "public", "qrcode.png");

export const setCurrentQR = (value: string | null): void => {
    currentQR = value;
};

export const getCurrentQR = (): string | null => currentQR;
export const getAuthStatus = (): boolean => sessionState.isAuthenticated;
export const setAuthStatus = (value: boolean): void => {
    sessionState.isAuthenticated = value;
};

export const generateQRCodePayload = async (qr: string): Promise<void> => {
    currentQR = qr; 
    console.log("🛠️ Tentando gerar QR em:", qrPath);

    try {
        const dir = path.dirname(qrPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        if (fs.existsSync(qrPath)) {
            fs.unlinkSync(qrPath);
        }

        await QRCode.toFile(qrPath, qr, {
            width: 250,
            margin: 1,
            color: { dark: "#000000", light: "#ffffff" }
        });
        
        console.log("✅ Novo QR Code gerado e salvo com sucesso!");
    } catch (err) {
        console.error("❌ Erro físico ao salvar QR:", err);
    }
};

export const handleAuthSuccess = (): void => {
    sessionState.isAuthenticated = true;
    currentQR = null; 
    if (fs.existsSync(qrPath)) {
        fs.unlinkSync(qrPath);
    }
};