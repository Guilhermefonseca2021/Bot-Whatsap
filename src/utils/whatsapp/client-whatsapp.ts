import { Client, LocalAuth } from 'whatsapp-web.js';

export const getAuth = (): boolean => {
    return false; 
};

export const setAuth = (status: boolean): void => {
    console.log(`Sessão atualizada: ${status}`);
};


export const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox'] }
});

export const sessionState = {
    isAuthenticated: false
};