/**
 * User type: Create User
 */
export type User = {
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
}
