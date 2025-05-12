import Database from "better-sqlite3";
import { Note } from "./type/Note";
import { NoteInfo } from "./type/NoteInfo";
import { User } from "./type/User";

 // Get all registered Note UUIDs
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

 // Get a list of all registered Notes
export const getNotesList = (dbPath: string):Array<NoteInfo> => {
    const db = new Database(dbPath);
    const noteInfoList = new Array<NoteInfo>();

    const stmt = db.prepare("SELECT * FROM Note");
    for (const item of stmt.iterate()) {
        const note = item as Record<keyof Note, unknown>;

        const id = typeof note.Id === "string" ? note.Id : "";
        let text = "";

        if (typeof note.Text === "string") {
            // Get the first line, remove the leading \id=UUID part, and if over 30 characters, truncate and add "..."
            const firstLine = note.Text.split(/\r?\n/)[0] ?? "";
            const removedUuid = firstLine.replace(/^\\id=[0-9a-fA-F\-]+\s*/, "");

            if (removedUuid.length > 30) {
                text = removedUuid.slice(0, 30) + "...";
            } else {
                text = removedUuid;
            }
        }

        noteInfoList.push({
            Id: id,
            Text: text
        });
    }

    db.close();

    return noteInfoList;
}

 // Get a Note by the specified Id
export const getNote = (dbPath: string, id: string):(Note | null) => {
    const db = new Database(dbPath);
    let note: Note | null = null;

    // Get the row from the Note table where the id matches
    const stmt = db.prepare("SELECT * FROM Note WHERE Id = ?");
    const item = stmt.get(id);

    if (item) {
        note = item as Note;
    }

    db.close();

    return note;
}

// Get a User
export const getUser = (dbPath: string): (User | null) => {
    const db = new Database(dbPath);
    let user: User | null = null;

    // Get the row from the User table
    const stmt = db.prepare("SELECT * FROM User");
    const item = stmt.get();

    if (item) {
        user = item as User;
    }

    db.close();

    return user;
}

 // Register a Note
export const addNote = (dbPath: string, note: Note): void => {
    const db = new Database(dbPath);

    const columns = [];
    const values = [];
    const placeholders = [];

    for (const key in note) {
        if (note[key as keyof Note] !== undefined) {
            columns.push(key);
            values.push(note[key as keyof Note]);
            placeholders.push("?");
        }
    }

    if (columns.length === 0) {
        db.close();
        throw new Error("No data to register");
    }

    const sql = `INSERT INTO Note (${columns.join(",")}) VALUES (${placeholders.join(",")})`;
    const stmt = db.prepare(sql);
    stmt.run(...values);

    db.close();
};
