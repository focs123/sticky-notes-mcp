import Database from "better-sqlite3";
import { Note } from "./Note";

export const getIdList = (dbPath: string): string => {
    const db = new Database(dbPath);

    const stmt = db.prepare("SELECT * FROM Note");
    let idText = "";
    let count = 1;

    for(const item of stmt.iterate()) {
        const note = item as Record<keyof Note, unknown> 

        idText += String(count) + ":" + note.Id + "\r\n";
    }

    db.close();

    return idText;
}
