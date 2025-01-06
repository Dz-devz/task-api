import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { ChatSchema } from "./schemas/chat-schema";

export const chatRoute = new Hono();
const app = new OpenAPIHono();

const getRoute = createRoute({
  method: "get",
  path: "/getMessage",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ChatSchema,
        },
      },
      description: "Retrieve Message",
    },
  },
});

app.openapi(getRoute, (c) => {
  return c.json({
    chat_id: 1,
    chat_type: "PRIVATE" as "PRIVATE" | "GROUP",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    UserChats: [],
    Messages: [],
    message: "Messages Retrieved",
  });
});

app.get(
  "/ui",
  swaggerUI({
    url: "/api/chat-app/doc",
  })
);

app.doc("/doc", {
  info: {
    title: "An API",
    version: "v1",
  },
  openapi: "3.1.0",
});

chatRoute.route("/", app);
// .get("/getMessage", async (c) => {
//   console.log("Hello from Hono!");

//   return c.json("Hello from hono");
// })
// .post("/create-message", async (c) => {
//   const response = c.req.json;
//   return c.json(response);
// })
// .put("/update-message/:id", async (c) => {
//   const params = c.req.param("id");
//   return c.json(params);
// })
// .delete("/delete-message/:id", async (c) => {
//   const params = c.req.param("id");
//   return c.json(params);
// });
