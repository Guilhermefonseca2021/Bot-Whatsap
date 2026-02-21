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

const deleteFolderContents = (folderRelativePath: string) => {
    const folderPath = path.resolve(folderRelativePath);

    if (!fs.existsSync(folderPath)) {
        console.log(`⚠️ Pasta não encontrada: ${folderPath}`);
        return;
    }

    try {
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            const curPath = path.join(folderPath, file);
            fs.rmSync(curPath, { recursive: true, force: true });
        }

        console.log(`🧹 Pasta limpa: ${folderPath}`);
    } catch (err) {
        console.error(`❌ Erro ao limpar ${folderPath}:`, err);
    }
};

const deleteQRCodeFile = () => {
    if (!authConfig.qrCodePath) return;

    const qrPath = path.resolve(authConfig.qrCodePath);

    if (!fs.existsSync(qrPath)) {
        console.log("⚠️ QR Code não encontrado.");
        return;
    }

    try {
        fs.unlinkSync(qrPath);
        console.log("🧹 qrcode.png removido com sucesso.");
    } catch (err) {
        console.error("❌ Erro ao remover qrcode.png:", err);
    }
};

const clearSessionData = () => {
    if (authConfig.sessionPaths) {
        Object.values(authConfig.sessionPaths).forEach((relativePath) => {
            deleteFolderContents(relativePath);
        });
    }

    deleteQRCodeFile();
};

export const startWhatsappConnection = async (): Promise<void> => {

    if (authConfig.isDev) {
        console.log("🛠 Modo DEV ativo — limpando sessões e QR...");
        clearSessionData();
    }

    client.on('qr', (qr) => {
        console.log("📸 QR Code recebido...");
        currentQR = qr;
        cleanAndGenerateQR(qr);
    });

    client.on('authenticated', () => {
        console.log("✅ Autenticado!");
        currentQR = null;

        deleteQRCodeFile();
        finalizeAuth();
    });

    client.on('ready', () => {
        console.log("🚀 Cliente pronto!");
    });

    try {
        await client.initialize();
    } catch (err) {
        console.error("❌ Erro ao inicializar WhatsApp:", err);
    }
};