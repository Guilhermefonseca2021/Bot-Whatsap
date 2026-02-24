import { Request, Response } from 'express';
import { client } from '../utils/whatsapp/client-whatsapp';

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: "Número e mensagem são obrigatórios." });
    }

    try {
        // 1. Limpa o número (deixa apenas dígitos)
        let formattedNumber = number.replace(/\D/g, '');

        // 2. Adiciona o sufixo do WhatsApp se não tiver
        if (!formattedNumber.endsWith('@c.us')) {
            formattedNumber = `${formattedNumber}@c.us`;
        }

        // 3. Envia a mensagem
        await client.sendMessage(formattedNumber, message);

        console.log(`✅ Mensagem enviada para: ${formattedNumber}`);
        return res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });

    } catch (error: any) {
        console.error("❌ Erro ao enviar mensagem:", error);
        return res.status(500).json({ error: "Falha ao enviar mensagem.", details: error.message });
    }
};

/**
 * Envia para o próprio usuário logado (Teste)
 */
export const sendToMe = async (req: Request, res: Response): Promise<any> => {
    const { message } = req.body;

    try {
        const myId = client.info.wid._serialized; // Pega o ID do bot logado
        await client.sendMessage(myId, message);
        
        return res.status(200).json({ success: true, message: "Teste enviado para você mesmo!" });
    } catch (error: any) {
        return res.status(500).json({ error: "Erro no teste", details: error.message });
    }
};