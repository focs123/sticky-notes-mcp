/**
 * Note type: Sticky note information
 */
export type Note = {
    /** The body of the note. The text content entered by the user. */
    Text?: string;
    /** Position information of the note window (a serialized string of coordinates, size, etc.). */
    WindowPosition?: string;
    /** Whether the note is currently open (0: open, 1: closed). */
    IsOpen?: number;
    /** Whether the note window is always on top (1: always on top, 0: normal). */
    IsAlwaysOnTop?: number;
    /** The ID of the source note. Used to indicate duplication or derivation. */
    CreationNoteIdAnchor?: string;
    /** Theme of the note (color or design type, e.g., Yellow, Green). */
    Theme?: string;
    /** Whether this is a future note (1: future note, 0: normal note). */
    IsFutureNote?: number;
    /** Remote ID for integration with external services. */
    RemoteId?: string;
    /** Whether the remote data is invalid (1: invalid, 0: valid). */
    ChangeKey?: string;
    /** Whether an insight (analysis) scan is pending (1: pending, 0: none). */
    LastServerVersion?: string;
    /** Schema version of the external service. */
    RemoteSchemaVersion?: number;
    /** Whether the remote data is invalid (1: invalid, 0: valid). */
    IsRemoteDataInvalid?: number;
    /** Whether an insight (analysis) scan is pending (1: pending, 0: none). */
    PendingInsightsScan?: number;
    /** Type of note (normal note, task, reminder, etc. depending on use). */
    Type?: string;
    /** Unique ID of the note. Primary key. */
    Id: string;
    /** Parent note ID. Used for hierarchy or association. */
    ParentId?: string;
    /** Creation timestamp (UNIX timestamp). */
    CreatedAt?: number;
    /** Deletion timestamp (UNIX timestamp, NULL or 0 if not deleted). */
    DeletedAt?: number;
    /** Last updated timestamp (UNIX timestamp). */
    UpdatedAt?: number;
};
