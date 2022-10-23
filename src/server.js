import { createServer, Model } from "miragejs";
import { v4 as uuid } from "uuid";

function makeServer() {
  createServer({
    models: {
      item: Model,
    },

    routes() {
      // miragejs module
      this.get("/items", () => ({
        items: ["Item 01", "Item 02"],
      }));

      this.post("/item", (_, request) => {
        const attrs = JSON.parse(request.requestBody);
        return attrs;
      });

      // crud module
      this.get("/crud/items", (schema) => schema.items.all());

      this.post("/crud/item", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        attrs.id = uuid().slice(0, 5);
        return schema.items.create(attrs);
      });

      this.put("/crud/item/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { id } = request.params;
        const item = schema.items.find(id);

        return item.update(attrs);
      });

      this.delete("/crud/item/:id", (schema, request) => {
        const { id } = request.params;
        return schema.find("item", id).destroy();
      });

      this.passthrough("/**");
    },

    seeds(server) {
      server.create("item", { id: uuid().slice(0, 5), name: "Daniel", age: 25 });
      server.create("item", { id: uuid().slice(0, 5), name: "Julia", age: 32 });
    },
  });
}

export default makeServer;
