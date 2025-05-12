import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { addNote, getIdList, getNote, getNotesList } from "./db";
import {z} from "zod";
import { createDefaultNote, getNoteText } from "./util";

// MCPサーバーのインスタンスを作成
const server = new McpServer({
    name: 'sticky-notes-mcp', // サーバー名
    version: '1.0.0', // バージョン
});

server.tool('get_notes_list', '付箋一覧を取得する', async() => {
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

// Idから付箋の内容を取得できるようにする
server.tool('get_note', 'IDから付箋を取得する', {id : z.string()} ,async({id}) => {
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

// 付箋を作成する
server.tool('add_note', '付箋を作成する', {text : z.string()} ,async({text}) => {
    const note = createDefaultNote(text);

    const dbPath = process.env.db_path  ?? '';

    addNote(dbPath, note);

    return {
        content: [{
            type: 'text',
            text: '作成が完了しました。',
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