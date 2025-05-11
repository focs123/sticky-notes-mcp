import { Note } from "./type/Note";

export const getNoteText = (note: Note): string => {
    if (typeof note.Text === "string") {
        return note.Text?.replaceAll(/^\\id=[0-9a-fA-F\-]+\s*/, "");
    } else {
        return "";
    }
}