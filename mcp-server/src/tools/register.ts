import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { findListByName } from "./findListByName.js";
import { createTodoItem } from "./createTodoItem.js";
import { updateTodoItem } from "./updateTodoItem.js";
import { completeTodoItem } from "./completeTodoItem.js";
import { deleteTodoItem } from "./deleteTodoItem.js";
export function registerTools(server: McpServer) {
    findListByName(server);
    createTodoItem(server);
    updateTodoItem(server);   
    completeTodoItem(server);
    deleteTodoItem(server);
}
