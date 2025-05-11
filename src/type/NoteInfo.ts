/**
 * NoteInfo型: 付箋の基本情報
 */
export type NoteInfo = {
    /** メモの一意なID。主キー。 */
    Id: string;
    /** メモの本文を省略したもの*/
    Text?: string;
}