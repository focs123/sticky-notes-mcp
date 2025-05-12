import { Note } from "./type/Note";
import { User } from "./type/User";
import crypto from "crypto";


export const createDefaultNote = (text: string, user: User): Note => {
    const lines = text.split(/\r?\n/);
    const linesWithUuid = lines.map(line => `\\id=${crypto.randomUUID()} ${line}`);
    return {
        Id: crypto.randomUUID(),
        Text: linesWithUuid.join('\n'),
        WindowPosition: undefined,
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
        PendingInsightsScan: 0,
        Type: undefined,
        ParentId: user.ParentId,
        CreatedAt: Date.now(),
        DeletedAt: undefined,
        UpdatedAt: Date.now(),
    };
};

export const getNoteText = (note: Note): string => {
    if (typeof note.Text === "string") {
        return note.Text
            .split('\n')
            .map(line => line.replace(/^\\id=[0-9a-fA-F\-]+\s*/, ""))
            .join('\n');
    } else {
        return "";
    }
}
