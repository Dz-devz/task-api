import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { routes } from "./controllers/routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

const app = new OpenAPIHono();

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

app.onError(errorHandlerMiddleware);

routes.forEach((route) => {
  app.route("/", route);
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server is running on http://localhost:${PORT}`);
