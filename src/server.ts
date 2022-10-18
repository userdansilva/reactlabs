import { createServer } from "miragejs";

function server() {
  createServer({
    routes() {
      this.get("/items", () => ({
        items: ["Item 01", "Item 02"],
      }));

      this.post("/item", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return attrs;
      });

      this.passthrough("/**");
    },
  });
}

export default server;
