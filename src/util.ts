import { Note } from "./type/Note";

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
