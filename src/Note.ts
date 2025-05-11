/**
 * Note型: note_table_description.csvに基づくメモ情報の型定義
 */
export type Note = {
    /** メモの本文。ユーザーが入力したテキスト内容。 */
    Text?: string;
    /** メモウィンドウの位置情報（座標やサイズなどをシリアライズした文字列）。 */
    WindowPosition?: string;
    /** メモが現在開いているかどうか（0: 開いている、1: 閉じている）。 */
    IsOpen?: number;
    /** メモウィンドウが常に最前面に表示されるか（1: 最前面、 0: 通常）。 */
    IsAlwaysOnTop?: number;
    /** 作成元のNoteのID。複製や派生元を示す場合に使用。 */
    CreationNoteIdAnchor?: string;
    /** メモのテーマ（色やデザインの種類など 例: Yellow Green）。 */
    Theme?: string;
    /** 将来のメモかどうか（1: 将来のメモ、 0: 通常のメモ）。 */
    IsFutureNote?: number;
    /** 外部サービスと連携する場合のリモートID。 */
    RemoteId?: string;
    /** リモートデータが無効かどうか（1: 無効、0: 有効）。 */
    ChangeKey?: string;
    /** インサイト（分析）スキャンが保留中か（1: 保留中、0: なし）。 */
    LastServerVersion?: string;
    /** 外部サービスのスキーマバージョン。 */
    RemoteSchemaVersion?: number;
    /** リモートデータが無効かどうか（1: 無効、 0: 有効）。 */
    IsRemoteDataInvalid?: number;
    /** インサイト（分析）スキャンが保留中か（1: 保留中、 0: なし）。 */
    PendingInsightsScan?: number;
    /** メモの種類（通常メモ、タスク、リマインダーなど用途に応じたタイプ）。 */
    Type?: string;
    /** メモの一意なID。主キー。 */
    Id: string;
    /** 親メモのID。階層構造や関連付けに使用。 */
    ParentId?: string;
    /** 作成日時（UNIXタイムスタンプ）。 */
    CreatedAt?: number;
    /** 削除日時（UNIXタイムスタンプ、未削除ならNULLまたは0）。 */
    DeletedAt?: number;
    /** 最終更新日時（UNIXタイムスタンプ）。 */
    UpdatedAt?: number;
};