import { Hono } from "hono";

export const chatRoute = new Hono()
  .get("/getMessage", async (c) => {
    console.log("Hello from Hono!");

    return c.json("Hello from hono");
  })
  .post("/create-message", async (c) => {
    const response = c.req.json;
    return c.json(response);
  })
  .put("/update-message/:id", async (c) => {
    const params = c.req.param("id");
    return c.json(params);
  })
  .delete("/delete-message/:id", async (c) => {
    const params = c.req.param("id");
    return c.json(params);
  });
