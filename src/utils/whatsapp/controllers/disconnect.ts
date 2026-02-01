import client from "../client-whatsapp";

let isReady = false;

export function disconnectBot() {
  client.on("ready", () => {
    isReady = true;
  });

  client.on("disconnected", () => {
    isReady = false;
  });
}

