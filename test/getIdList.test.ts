import {getIdList} from "../src/db";

test('checkIdList', () => {
    const dbPath = "/home/soba/StickyNotes/sticky-notes-mcp/dev_sqlite/plum.sqlite";
    expect(getIdList(dbPath))
        .toStrictEqual([
            '7ec12a3d-42a6-45b7-b868-1b4ebd2000c8',
            'f596f814-c46f-48c1-b9a1-d5f97666ca29'
        ]);
});