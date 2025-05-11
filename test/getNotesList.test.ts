import { getNotesList } from "../src/db";

test('checkNotesList', () => {
    const dbPath = "/home/soba/StickyNotes/sticky-notes-mcp/sqlite_folder/plum.sqlite";
    expect(getNotesList(dbPath)).toStrictEqual([
        {
            Id: "7ec12a3d-42a6-45b7-b868-1b4ebd2000c8",
            Text: "\\b test1\\b"
        },
        {
            Id: "f596f814-c46f-48c1-b9a1-d5f97666ca29",
            Text: ""
        }
    ]);
});
