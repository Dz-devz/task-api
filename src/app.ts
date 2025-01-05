import { Hono } from "hono";
import { chatRoute } from "./api/chat-app";

const app = new Hono();

const apiRoutes = app.basePath("/api").route("/chat-app", chatRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
