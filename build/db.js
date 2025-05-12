"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNote = exports.getNote = exports.getNotesList = exports.getIdList = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
// 登録されているNoteのUUIDを全て取得
const getIdList = (dbPath) => {
    const db = new better_sqlite3_1.default(dbPath);
    const stmt = db.prepare("SELECT * FROM Note");
    const idList = new Array();
    for (const item of stmt.iterate()) {
        const note = item;
        if (typeof note.Id === "string") {
            idList.push(note.Id);
        }
    }
    db.close();
    return idList;
};
exports.getIdList = getIdList;
// 登録されているNoteの一覧を取得
const getNotesList = (dbPath) => {
    const db = new better_sqlite3_1.default(dbPath);
    const noteInfoList = new Array();
    const stmt = db.prepare("SELECT * FROM Note");
    for (const item of stmt.iterate()) {
        const note = item;
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
};
exports.getNotesList = getNotesList;
// 指定したIdをもとにNoteを取得する
const getNote = (dbPath, id) => {
    const db = new better_sqlite3_1.default(dbPath);
    let note = null;
    // Noteテーブルからidが一致する値を取得
    const stmt = db.prepare("SELECT * FROM Note WHERE Id = ?");
    const item = stmt.get(id);
    if (item) {
        note = item;
    }
    db.close();
    return note;
};
exports.getNote = getNote;
// Noteを登録する
const addNote = (dbPath, note) => {
    const db = new better_sqlite3_1.default(dbPath);
    const columns = [];
    const values = [];
    const placeholders = [];
    for (const key in note) {
        if (note[key] !== undefined) {
            columns.push(key);
            values.push(note[key]);
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
exports.addNote = addNote;
