import client from "../client-whatsapp";

export default function authenticateWhatsApp() {
  client.on("auth_failure", (msg) => {
    console.error("❌ AUTH FAILURE:", msg);
  });
}
