import client from "../client-whatsapp";

export default function authenticateWhatsApp() {
  client.on("authenticated", () => {
    console.log("✅ Authenticated");
  });
}
