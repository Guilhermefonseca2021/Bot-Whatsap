import { Client, LocalAuth } from 'whatsapp-web.js';

export const getAuth = (): boolean => {
    return false; 
};

export const setAuth = (status: boolean): void => {
    console.log(`Sessão atualizada: ${status}`);
};

export const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bot-session", 
        dataPath: "./.wwebjs_auth"
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

export const sessionState = {
    isAuthenticated: false
};