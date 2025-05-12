"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const db_1 = require("./db");
const zod_1 = require("zod");
const util_1 = require("./util");
// Create an instance of the MCP server
const server = new mcp_js_1.McpServer({
    name: 'sticky-notes-mcp', // Server name
    version: '1.0.0', // Version
});
server.tool('get_notes_list', 'Get a list of sticky notes', async () => {
    const dbPath = process.env.db_path ?? '';
    const notes = (0, db_1.getNotesList)(dbPath);
    let notesText = "";
    for (const note of notes) {
        notesText += `id:${note.Id} title:${note.Text}`;
    }
    return {
        content: [{
                type: 'text',
                text: notesText,
            }],
    };
});
// Enable retrieval of sticky note content by Id
server.tool('get_note', 'Get a sticky note by ID', { id: zod_1.z.string() }, async ({ id }) => {
    const dbPath = process.env.db_path ?? '';
    const note = (0, db_1.getNote)(dbPath, id);
    let message = "";
    if (note !== null) {
        message = (0, util_1.getNoteText)(note);
    }
    return {
        content: [{
                type: 'text',
                text: message,
            }],
    };
});
// ToDo: Create a sticky note
server.tool('add_note', 'Create a sticky note', { text: zod_1.z.string() }, async ({ text }) => {
    const dbPath = process.env.db_path ?? '';
    const user = (0, db_1.getUser)(dbPath);
    let returnMessage = 'Failed.';
    if (user !== null) {
        const note = (0, util_1.createDefaultNote)(text, user);
        (0, db_1.addNote)(dbPath, note);
        returnMessage = 'Creation completed.';
    }
    return {
        content: [{
                type: 'text',
                text: returnMessage,
            }],
    };
});
// Define the main function (set sqlite path, etc.?)
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.log('StickyNote MCP Server running on stdio');
}
main().catch(error => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
