import * as fs from 'fs';
import path from 'path';
import { client } from './client-whatsapp';
import { authConfig } from '../../config/auth';
import { cleanAndGenerateQR, finalizeAuth } from '../../controllers/authControllers';

let currentQR: string | null = null;
let isAuthenticated = false;

export const setCurrentQR = (value: string | null): void => {
    currentQR = value;
};

export const setAuthStatus = (value: boolean) => {
    isAuthenticated = value;
};

export const getAuthStatus = () => isAuthenticated;
export const getCurrentQR = () => currentQR;

/**
 * Limpa o conteúdo de uma pasta de forma segura, 
 * lidando com arquivos travados pelo Windows (EPERM).
 */
const deleteFolderContents = (folderRelativePath: string) => {
    const folderPath = path.resolve(folderRelativePath);

    if (!fs.existsSync(folderPath)) {
        console.log(`⚠️ Pasta não encontrada: ${folderPath}`);
        return;
    }

    try {
        // No Windows, usamos rmSync com recursividade e tentativas automáticas
        fs.rmSync(folderPath, { 
            recursive: true, 
            force: true, 
            maxRetries: 3, 
            retryDelay: 100 
        });
        console.log(`🧹 Pasta limpa com sucesso: ${folderPath}`);
    } catch (err: any) {
        if (err.code === 'EPERM') {
            console.warn(`⚠️ Aviso: Não foi possível excluir alguns arquivos em ${folderPath} (estão em uso).`);
        } else {
            console.error(`❌ Erro crítico ao limpar ${folderPath}:`, err.message);
        }
    }
};

/**
 * Remove o arquivo de imagem do QR Code
 */
const deleteQRCodeFile = () => {
    if (!authConfig.qrCodePath) return;

    const qrPath = path.resolve(authConfig.qrCodePath);

    if (fs.existsSync(qrPath)) {
        try {
            fs.unlinkSync(qrPath);
            console.log("🧹 qrcode.png removido.");
        } catch (err) {
            console.error("❌ Erro ao remover qrcode.png:", err);
        }
    }
};

const clearSessionData = () => {
    if (authConfig.sessionPaths) {
        Object.values(authConfig.sessionPaths).forEach((relativePath) => {
            deleteFolderContents(relativePath as string);
        });
    }
    deleteQRCodeFile();
};

export const startWhatsappConnection = async (): Promise<void> => {
    
    if (authConfig.isDev) {
        console.log("🛠 Modo DEV ativo — Tentando limpar sessões e QR...");
        clearSessionData(); // COMENTE ESTA LINHA para parar de apagar o login
    }

    client.on('qr', (qr) => {
        console.log("📸 QR Code recebido, gerando imagem...");
        currentQR = qr;
        cleanAndGenerateQR(qr);
    });

    client.on('authenticated', async () => {
        console.log("✅ Autenticado com sucesso!");
        currentQR = null;
        setAuthStatus(true);
        
        deleteQRCodeFile();
        await finalizeAuth();
    });

    client.on('ready', () => {
        console.log("🚀 Cliente pronto e conectado!");
    });

    client.on('auth_failure', (msg) => {
        console.error("❌ Falha na autenticação:", msg);
        setAuthStatus(false);
    });

    try {
        await client.initialize();
    } catch (err) {
        console.error("❌ Erro grave ao inicializar WhatsApp:", err);
    }
};