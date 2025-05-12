"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteText = exports.createDefaultNote = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createDefaultNote = (text) => {
    const lines = text.split(/\r?\n/);
    const linesWithUuid = lines.map(line => `\\id=${crypto_1.default.randomUUID()} ${line}`);
    return {
        Id: crypto_1.default.randomUUID(),
        Text: linesWithUuid.join('\n'),
        WindowPosition: "",
        IsOpen: 0,
        IsAlwaysOnTop: 0,
        CreationNoteIdAnchor: undefined,
        Theme: ["Yellow", "Blue", "Green"][Math.floor(Math.random() * 3)],
        IsFutureNote: 0,
        RemoteId: undefined,
        ChangeKey: undefined,
        LastServerVersion: undefined,
        RemoteSchemaVersion: undefined,
        IsRemoteDataInvalid: undefined,
        PendingInsightsScan: undefined,
        Type: undefined,
        ParentId: undefined,
        CreatedAt: Date.now(),
        DeletedAt: 0,
        UpdatedAt: Date.now(),
    };
};
exports.createDefaultNote = createDefaultNote;
const getNoteText = (note) => {
    if (typeof note.Text === "string") {
        return note.Text
            .split('\n')
            .map(line => line.replace(/^\\id=[0-9a-fA-F\-]+\s*/, ""))
            .join('\n');
    }
    else {
        return "";
    }
};
exports.getNoteText = getNoteText;
