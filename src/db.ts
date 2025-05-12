import Database from "better-sqlite3";
import { Note } from "./type/Note";
import { NoteInfo } from "./type/NoteInfo";

// 登録されているNoteのUUIDを全て取得
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

// 登録されているNoteの一覧を取得
export const getNotesList = (dbPath: string):Array<NoteInfo> => {
    const db = new Database(dbPath);
    const noteInfoList = new Array<NoteInfo>();

    const stmt = db.prepare("SELECT * FROM Note");
    for (const item of stmt.iterate()) {
        const note = item as Record<keyof Note, unknown>;

        const id = typeof note.Id === "string" ? note.Id : "";
        let text = "";

        if (typeof note.Text === "string") {
            // 1行目を取得し、先頭の\id=UUID部分を除去して15文字以上は省略し「・・・」を付与
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

// 指定したIdをもとにNoteを取得する
export const getNote = (dbPath: string, id: string):(Note | null) => {
    const db = new Database(dbPath);
    let note: Note | null = null;

    // Noteテーブルからidが一致する値を取得
    const stmt = db.prepare("SELECT * FROM Note WHERE Id = ?");
    const item = stmt.get(id);

    if (item) {
        note = item as Note;
    }

    db.close();

    return note;
}

// Noteを登録する
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
        throw new Error("登録するデータがありません");
    }

    const sql = `INSERT INTO Note (${columns.join(",")}) VALUES (${placeholders.join(",")})`;
    const stmt = db.prepare(sql);
    stmt.run(...values);

    db.close();
};
