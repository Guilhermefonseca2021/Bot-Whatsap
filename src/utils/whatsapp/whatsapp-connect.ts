import { generateWhatsAppQRcode } from "../QRcode/generate-whatsapp-QRcode";
import client from "./client-whatsapp";

export default function whatsappConnect() {
  console.log("🚀 Registrando eventos QR");
  generateWhatsAppQRcode(); 
  client.initialize();      
}