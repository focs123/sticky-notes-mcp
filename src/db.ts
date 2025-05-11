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

    const noteInfoList = new Array<NoteInfo>();

    return noteInfoList;
}
