import { Hono } from "hono";

export const chatRoute = new Hono().get("/getMessage", async (c) => {
  console.log("Hello from Hono!");

  return c.json("Hello from hono");
});
