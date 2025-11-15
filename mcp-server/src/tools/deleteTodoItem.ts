
import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function deleteTodoItem(server: McpServer) {
    server.tool(
        "delete_todo_item",
        "Delete an existing TodoItem from a specified list.",
        {
            list_id: z.number(),
            item_id: z.number(),
        },
        async ({ list_id, item_id }) => {
            const baseUrl = process.env.URL_API!;
            const url = `${baseUrl}/api/todolists/${list_id}/items/${item_id}`;

            const response = await axios.delete(url);

            return {
                content: [
                    {
                        type: "text",
                        text: response.status === 204
                            ? `Item ${item_id} successfully deleted from list ${list_id}.`
                            : `Unexpected response: ${response.status}`,
                    },
                ],
            };
        }
    );
}
