import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export type Contact = {
  id: string;
  name: string;
  lastMessage?: string;
};

export type Message = {
  from: string;
  to: string;
  text: string;
  timestamp: number;
};

export interface DBSchema {
  contatos: Contact[];
  mensagens: Message[];
}

const adapter = new JSONFile<DBSchema>("./src/db/database.json");

export const db = new Low<DBSchema>(adapter, {
  contatos: [],
  mensagens: [],
});

export async function initializeDB() {
  await db.read();

  db.data ||= {
    contatos: [],
    mensagens: [],
  };

  await db.write();
}