import client from "../client-whatsapp";

let isAuthenticated = false;
let currentQR: string | null = null;

export function initWhatsAppAuthListeners() {
  client.on("authenticated", () => {
    isAuthenticated = true;
    currentQR = null;
    console.log("✅ WhatsApp Authenticated");
  });

  client.on("auth_failure", (msg) => {
    console.error("❌ AUTH FAILURE:", msg);
    isAuthenticated = false;
  });
}

export function getAuthStatus() {
  return isAuthenticated;
}

export function getCurrentQR() {
  return currentQR;
}

export function setCurrentQR(qr: string) {
  currentQR = qr;
}
