import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getIdList } from "./db";

// MCPサーバーのインスタンスを作成
const server = new McpServer({
    name: 'uuid-generator', // サーバー名
    version: '1.0.0', // バージョン
});

// MCPのレスポンス形式に従ってUUIDを返却
server.tool('generate_uuid', 'UUIDを生成する。', async () => {
    const uuid = crypto.randomUUID();

    return {
        content: [{
            type: 'text',
            text: `生成されたUUID: ${uuid}`,
        }],
    }
});

// envの値が取得できるか確認
server.tool('get_env_message', 'envの値を取得する', async() => {
    const message = process.env.env_test  ?? '';

    return {
        content: [{
            type: 'text',
            text: `生成されたmessage: ${message}`,
        }],
    }
});

// StickyNotesのIDを取得できるようにする
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


// メイン関数を定義 sqliteのパスとかを設定？
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.log('UUID Generator MCP Server running on stdio');
}

main().catch(error => {
    console.error('Fatal error in main():', error)
    process.exit(1);
});