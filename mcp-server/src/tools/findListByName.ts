import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { api } from "../server.js";


export function findListByName(server: McpServer) {

    server.tool(
        "find_list_by_name",
        "Busca una lista por su nombre y devuelve su ID.",
        {
            name: z.string()
        },
        async ({ name }) => {

            
            const res = await api.get("/api/todolists");
            const lists = res.data;

         
            const list = lists.find((l: any) => l.name === name);

            if (!list) {
                return {
                    content: [
                        { type: "text", text: `No existe la lista "${name}".` }
                    ]
                };
            }

            return {
                content: [
                    { type: "text", text: JSON.stringify({ list_id: list.id }) }
                ]
            };
        }
    );
}
