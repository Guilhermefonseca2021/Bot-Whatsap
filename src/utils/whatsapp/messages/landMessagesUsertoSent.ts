import { client } from "../client-whatsapp";

const contatos = ["5511999999999@c.us"];

export function landMessageUsersToSent() {
  client.on("message_create", (message) => {
    console.log(message.body);
    if (message.body === "Ola! tudo bem? estou interessado nos seus serviços") {
      client.sendMessage(
        message.from,
        "Muito obrigado pelo seu interesse! Como posso ajudar você hoje?",
      );
    } else {
      client.sendMessage(
        message.from,
        "Desculpe, não estamos disponíveis agora. Por favor, deixe sua mensagem e entraremos em contato em breve.",
      );
    }
  });
}
