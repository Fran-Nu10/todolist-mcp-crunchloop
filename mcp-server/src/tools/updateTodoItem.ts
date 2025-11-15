

import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const UpdateSchema = z.object({
    list_id: z.number(),
    item_id: z.number(),
    description: z.string(),
});


export function updateTodoItem(server: McpServer) {
    server.tool(
        "update_todo_item",
        "Update an existing TodoItem.",
        {
            list_id: z.number(),
            item_id: z.number(),
            description: z.string(),
        },
        async ({ list_id, item_id, description }) => {
            const baseUrl = process.env.URL_API!;
            const url = `${baseUrl}/api/todolists/${list_id}/items/${item_id}`;

            const response = await axios.patch(url, { description });

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
