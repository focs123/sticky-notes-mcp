# sticky-notes-mcp

WinodwsのStickyNoteを操作するMCPサーバーです。  
MCP (Model Context Protocol) に準拠し、標準入出力 (stdio) を通じて付箋の一覧取得・ID指定取得・付箋の作成が可能

## 機能概要
- 付箋一覧の取得
- 付箋ID指定での内容取得
- 付箋の作成

##  Configure MCP server

```
"sticky-notes-mcp": {
    "command": "node",
    "args": [
        "/[you path]/sticky-notes-mcp/build/index.js"
    ],
    "env": {
        "db_path": "/[you path]/plum.sqlite"
    },
    "autoApprove": [
        "add_note",
        "get_notes_list",
        "get_note"
    ]
}
```
