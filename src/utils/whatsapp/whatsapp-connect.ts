import client from "./client-whatsapp";
import { Message } from "whatsapp-web.js";

export default function whatsappConnect() {
  client.initialize();
}
