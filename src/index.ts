import { serve } from "@hono/node-server";
import { config } from "dotenv";
import app from "./app";

serve({
  fetch: app.fetch,
});
config();

const PORT = process.env.PORT || 3000;

console.log(`Server is running on http://localhost:${PORT}`);
