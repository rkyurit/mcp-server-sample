import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "my-notion-db-mcp-server",
  version: "1.0.0",
});

server.tool(
  "get_article",
  "Notionに保存された記事の一覧を取得するツール",
  async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/notion/articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const json = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(json) }],
      };
    } catch (e) {
      console.error(e);
      throw new Error("error");
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`MCP Server started - ${new Date().toLocaleString()}`);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
