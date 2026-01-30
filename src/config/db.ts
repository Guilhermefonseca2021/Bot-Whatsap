// src/config/db.ts
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import type { ContactInfo } from "./contact-info";

export interface DBSchema {
  contatos: ContactInfo[];
}

const adapter = new JSONFile<DBSchema>("./src/db/database.json");

export const db = new Low<DBSchema>(adapter, {
  contatos: [],
});

export async function initializeDB() {
  await db.read();

  if (!db.data) {
    db.data = { contatos: [] };
    await db.write();
  }
}
