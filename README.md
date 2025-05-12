# sticky-notes-mcp

WinodwsのStickyNoteを操作するMCPサーバーです。  
<<<<<<< HEAD
MCP (Model Context Protocol) に準拠し、標準入出力 (stdio) を通じて付箋の一覧取得・ID指定取得が可能です。  
=======
MCP (Model Context Protocol) に準拠し、標準入出力 (stdio) を通じて付箋の一覧取得・ID指定取得・新規作成が可能。  
>>>>>>> b657473f6f7212b3fd4c7fdda8c605d31e8b65ba

## 機能概要

- 付箋一覧の取得
- 付箋ID指定での内容取得
- ToDo 新規付箋の作成

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
