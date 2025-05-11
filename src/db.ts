import Database from "better-sqlite3";
import { Note } from "./Note";

export const getIdList = (dbPath: string): Array<string> => {
    const db = new Database(dbPath);

    const stmt = db.prepare("SELECT * FROM Note");
    const idList = new Array<string>();

    for(const item of stmt.iterate()) {
        const note = item as Record<keyof Note, unknown> 
        if (typeof note.Id === "string") {
            idList.push(note.Id);
        }
    }

    db.close();

    return idList;
}
