import { Message } from "whatsapp-web.js";
import { isAuthenticated } from "../utils/state/whatsapp-state";
import { Messages } from "../constants/message";

export class AutoReplyService {

  async process(message: Message): Promise<void> {

    if (message.fromMe) return;

    const text = message.body
      .trim()
      .toLowerCase();

    switch (text) {

      case "oi":
      case "ola":
      case "olá":
      case "menu":
      case "início":
      case "inicio":
      case "ajuda":

        return this.send(message, Messages.welcome);

      case "1":
      case "informações":
      case "informacoes":

        return this.send(message, Messages.info);

      case "2":
      case "horário":
      case "horario":

        return this.send(message, Messages.hours);

      case "3":
      case "atendente":
      case "humano":

        return this.send(message, Messages.attendant);

      case "4":
      case "!status":
      case "status":

        return this.send(
          message,
          isAuthenticated()
            ? Messages.statusOnline
            : "⚠️ Sistema Offline."
        );

      case "5":

        return this.send(message, Messages.help);

      case "tchau":
      case "obrigado":
      case "até":
      case "ate":

        return this.send(message, Messages.goodbye);

      default:

        return this.send(message, Messages.unknown);

    }

  }

  private async send(
    message: Message,
    text: string
  ): Promise<void> {

    await message.reply(text);

  }

}