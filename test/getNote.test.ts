import { getNote } from "../src/db";
import { Note } from "../src/type/Note";

describe("getNote", () => {
  const dbPath = "/home/soba/StickyNotes/sticky-notes-mcp/sqlite_folder/plum.sqlite";

  it("should return the correct Note for an existing Id (1件目)", () => {
    const note = getNote(dbPath, "7ec12a3d-42a6-45b7-b868-1b4ebd2000c8");
    expect(note).toMatchObject({
      Id: "7ec12a3d-42a6-45b7-b868-1b4ebd2000c8",
      Text: ['\\\id=1c0d3f14-eed4-4fb4-ac6f-515b784dfa5d\\b test1\\b0 ',
    '\\\id=a60e1f28-0928-4fca-a3c4-4cd5df806dc9 テスト1です改行なしてすとあああああああああああああああああああああああああああああ',
    '\\\id=eaff9856-a133-4095-a5d0-74f442e82dda テスト2改行あり',
    '\\\id=da5bc222-05ef-4c41-beb4-17081b0e4ef5 ',
    '\\\id=2d2eaf57-13a6-4735-bc7b-9ce488f76dc4 テスト3改行のみ',
    '\\\id=02c04cf8-124a-470e-b660-ef90cf7e3ec0\\l てんうち',
    '\\\id=ca91ef1d-9b36-4266-83cd-d016c3d7e222\\strike\\\l0 取り消し\\strike0 ',
    '\\\id=75053854-4344-4f73-a236-e0a2861bd298\\i 斜体\\i0 ',
    '\\\id=1c195f79-5803-4364-8b6e-47b5a3b598d0\\ul アンダーバー\\ul0 ',
    '\\\id=a7832193-51df-4a58-95b1-656aa4eebb6c ',].join('\r\n')
    });
  });

  it("should return the correct Note for an existing Id (2件目)", () => {
    const note = getNote(dbPath, "f596f814-c46f-48c1-b9a1-d5f97666ca29");
    expect(note).toMatchObject({
      Id: "f596f814-c46f-48c1-b9a1-d5f97666ca29"
    });
  });

  it("should return null for a non-existent Id", () => {
    const note = getNote(dbPath, "00000000-0000-0000-0000-000000000000");
    expect(note).toBeNull();
  });
});
