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
            // 1行目を取得し、先頭の\id=UUID部分を除去して先頭10文字のみ
            const firstLine = note.Text.split(/\r?\n/)[0] ?? "";
            const removedUuid = firstLine.replace(/^\\id=[0-9a-fA-F\-]+\s*/, "");

            text = removedUuid.slice(0, 10);
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
