import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { config } from "dotenv";
import { ChatSchema } from "./api/schemas/chat-schema";

const app = new OpenAPIHono();
config();

const getRoute = createRoute({
  method: "get",
  path: "/getMessage",
  summary: "Retrieve a message",
  description: "Retrieve the message of the users.",
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
  "/",
  swaggerUI({
    url: "/openapi.json",
  })
);

app.doc("/openapi.json", {
  info: {
    title: "An API",
    version: "v1",
  },
  openapi: "3.1.0",
});

app.route("/", app);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server is running on http://localhost:${PORT}`);
