import { Client, LocalAuth } from 'whatsapp-web.js';


const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "sessao-cliente-1", 
        dataPath: "./sessions"      
    }), 
    puppeteer: {
        headless: true,  
        args: [
            '--no-sandbox',  
            '--disable-setuid-sandbox',
            '--disable-extensions',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-gl-drawing-for-tests'
        ]
    }
});

export default client;