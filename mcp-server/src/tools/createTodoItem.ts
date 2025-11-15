import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { api } from "../server.js";


export function createTodoItem(server: McpServer) {

    server.tool(
        "create_todo_item",
        "Crea un item en una lista de tareas existente.",
        {
            list_id: z.number().optional(),
            list_name: z.string().optional(),
            description: z.string().min(1, "La descripción no puede estar vacía.")
        },

        async ({ list_id, list_name, description }) => {

          
            if (!list_id && list_name) {
                try {
                    const res = await api.get("/api/todolists");
                    const lists = res.data;
                    const found = lists.find((l: any) => l.name === list_name);

                    if (!found) {
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: `No existe la lista "${list_name}".`
                                }
                            ]
                        };
                    }

                    list_id = found.id;
                } catch (err: any) {
                    return {
                        content: [{ type: "text", text: "Error buscando lista por nombre." }]
                    };
                }
            }

       
            if (!list_id) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "Debes enviar list_id o list_name."
                        }
                    ]
                };
            }

         
            try {
                const res = await api.post(`/api/todolists/${list_id}/items`, {
                    description
                });

                const item = res.data;

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(item)
                        }
                    ]
                };

            } catch (err: any) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error al crear el item: ${err.response?.data || err.message}`
                        }
                    ]
                };
            }
        }
    );
}
