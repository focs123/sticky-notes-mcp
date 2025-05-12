"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const db_1 = require("./db");
const zod_1 = require("zod");
const util_1 = require("./util");
// MCPサーバーのインスタンスを作成
const server = new mcp_js_1.McpServer({
    name: 'sticky-notes-mcp', // サーバー名
    version: '1.0.0', // バージョン
});
server.tool('get_notes_list', '付箋一覧を取得する', async () => {
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
// Idから付箋の内容を取得できるようにする
server.tool('get_note', 'IDから付箋を取得する', { id: zod_1.z.string() }, async ({ id }) => {
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
// 付箋を作成する
server.tool('add_note', '付箋を作成する', { text: zod_1.z.string() }, async ({ text }) => {
    const note = (0, util_1.createDefaultNote)(text);
    const dbPath = process.env.db_path ?? '';
    (0, db_1.addNote)(dbPath, note);
    return {
        content: [{
                type: 'text',
                text: '作成が完了しました。',
            }],
    };
});
// メイン関数を定義 sqliteのパスとかを設定？
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.log('StickyNote MCP Server running on stdio');
}
main().catch(error => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
