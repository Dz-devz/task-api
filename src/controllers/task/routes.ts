import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createTaskHandler,
  createTaskRoute,
  deleteSpecificRoute,
  deleteTaskHandler,
  getRoute,
  getSpecificRoute,
  getTaskHandler,
  getTasksHandler,
  updateSpecificRoute,
  updateTaskHandler,
} from "./index";

const routes = new OpenAPIHono()
  .openapi(getRoute, getTasksHandler)
  .openapi(createTaskRoute, createTaskHandler)
  .openapi(getSpecificRoute, getTaskHandler)
  .openapi(updateSpecificRoute, updateTaskHandler)
  .openapi(deleteSpecificRoute, deleteTaskHandler);

export default routes;
