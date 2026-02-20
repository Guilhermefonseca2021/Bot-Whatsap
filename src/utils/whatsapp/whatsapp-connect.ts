import * as fs from 'fs';
import path from 'path';
import { client } from './client-whatsapp';
import { authConfig } from '../../config/auth';
import { cleanAndGenerateQR, finalizeAuth } from '../../controllers/authControllers';

let currentQR: string | null = null;

export const setCurrentQR = (value: string | null): void => {
    currentQR = value;
};
export const getCurrentQR = () => currentQR;

const clearSessionData = () => {
    const foldersToClear = [
        path.resolve(".wwebjs_auth"),
        path.resolve(".wwebjs_cache"),
        path.resolve("public/sessions") 
    ];

    foldersToClear.forEach(folderPath => {
        if (fs.existsSync(folderPath)) {
            try {
                fs.rmSync(folderPath, { recursive: true, force: true });
                console.log(`🧹 [DEV] Pasta removida: ${path.basename(folderPath)}`);
            } catch (err) {
                console.error(`❌ Erro ao remover ${path.basename(folderPath)}:`, err);
            }
        }
    });
};

export const startWhatsappConnection = async (): Promise<void> => {
    client.on('qr', (qr) => {
        console.log("📸 QR Code recebido, tentando gerar arquivo físico...");
        currentQR = qr; 
        cleanAndGenerateQR(qr);
    });

    client.on('authenticated', () => {
        console.log("✅ Autenticado!"); 
        currentQR = null; 
        finalizeAuth();
    });

    client.on('ready', () => {
        console.log("🚀 Cliente pronto!");
    });

    if (authConfig.isDev) {
        clearSessionData();
    }

    try {
        await client.initialize();
    } catch (err) {
        console.error("❌ Erro ao inicializar WhatsApp:", err);
    }
};