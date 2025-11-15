import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools/register.js";

async function main() {
    //create the MCP serve
    const server = new McpServer({
        name: "todo-mcp-server",
        version: "1.0.0"
    });

    //register tools
    registerTools(server);

    // connect server to Claude Desktop vi STDIO
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch(err => {
    console.error("MCP server failed:", err);
    process.exit(1);
});
