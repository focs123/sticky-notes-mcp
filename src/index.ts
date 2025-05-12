import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { addNote, getIdList, getNote, getNotesList, getUser } from "./db";
import {z} from "zod";
import { createDefaultNote, getNoteText } from "./util";

 // Create an instance of the MCP server
const server = new McpServer({
    name: 'sticky-notes-mcp', // Server name
    version: '1.0.0', // Version
});

server.tool('get_notes_list', 'Get a list of sticky notes', async() => {
    const dbPath = process.env.db_path  ?? '';

    const  notes = getNotesList(dbPath);

    let notesText = "";

    for (const note  of notes) {
        notesText += `id:${note.Id} title:${note.Text}`
    }

    return {
        content: [{
            type: 'text',
            text: notesText,
        }],
    }
});

 // Enable retrieval of sticky note content by Id
server.tool('get_note', 'Get a sticky note by ID', {id : z.string()} ,async({id}) => {
    const dbPath = process.env.db_path  ?? '';

    const note = getNote(dbPath, id);
    let message = ""

    if (note !== null) {
        message = getNoteText(note);
    }

    return {
        content: [{
            type: 'text',
            text: message,
        }],
    }
});

 // ToDo: Create a sticky note
server.tool('add_note', 'Create a sticky note', {text : z.string()} ,async({text}) => {
    const dbPath = process.env.db_path  ?? '';

    const user = getUser(dbPath);

    let returnMessage = 'Failed.';

    if (user !== null) {
        const note = createDefaultNote(text, user);

        addNote(dbPath, note);
        returnMessage =  'Creation completed.';
    }

    return {
        content: [{
            type: 'text',
            text: returnMessage,
        }],
    }

});

 // Define the main function (set sqlite path, etc.?)
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.log('StickyNote MCP Server running on stdio');
}

main().catch(error => {
    console.error('Fatal error in main():', error)
    process.exit(1);
});
