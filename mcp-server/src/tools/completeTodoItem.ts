
import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function completeTodoItem(server: McpServer) {
    server.tool(
        "complete_todo_item",
        "Mark an existing TodoItem as completed.",
        {
            list_id: z.number(),
            item_id: z.number(),
        },
        async ({ list_id, item_id }) => {
            const baseUrl = process.env.URL_API!;
            const url = `${baseUrl}/api/todolists/${list_id}/items/${item_id}/complete`;

            const response = await axios.post(url);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(response.data, null, 2),
                    },
                ],
            };
        }
    );
}
