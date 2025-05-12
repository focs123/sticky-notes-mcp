import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getIdList, getNote, getNotesList } from "./db";
import {z} from "zod";
import { getNoteText } from "./util";

// MCPサーバーのインスタンスを作成
const server = new McpServer({
    name: 'sticky-notes-mcp', // サーバー名
    version: '1.0.0', // バージョン
});

// StickyNotesのIDを取得できるようにする
server.tool('get_notes_list', 'Notesの一覧を取得する', async() => {
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

//  StickyNotesから一覧を取得できる
server.tool('get_id_list', 'NoteのIDを取得する', async() => {
    const dbPath = process.env.db_path  ?? '';

    const idList = getIdList(dbPath);

    return {
        content: [{
            type: 'text',
            text: idList.join(","),
        }],
    }
});

// Idから付箋の内容を取得できるようにする
server.tool('get_Note', 'IDから付箋を取得する', {id : z.string()} ,async({id}) => {
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

// メイン関数を定義 sqliteのパスとかを設定？
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.log('StickyNote MCP Server running on stdio');
}

main().catch(error => {
    console.error('Fatal error in main():', error)
    process.exit(1);
});