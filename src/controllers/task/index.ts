import { createRoute, z } from "@hono/zod-openapi";
import { type Handler } from "hono";
import {
  createTaskData,
  deleteTaskData,
  getTaskData,
  getTasksData,
  updateTaskData,
} from "../../data";
import { taskSchema } from "./schema";

export const taskParamsSchema = {
  params: z.object({
    id: z.string().openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1",
    }),
  }),
};

export const createTaskSchema = {
  body: taskSchema.pick({
    task: true,
    description: true,
    priority: true,
    status: true,
  }),
};

export const updateTaskSchema = {
  body: taskSchema.pick({
    task: true,
    description: true,
    priority: true,
    status: true,
  }),
};

export const getRoute = createRoute({
  method: "get",
  path: "/tasks",
  tags: ["Tasks"],
  summary: "List of all tasks",
  description: "Retrieve list of all tasks.",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
      description: "Retrieve Message",
    },
  },
});

export const getTasksHandler: Handler = async (c) => {
  const tasks = await getTasksData();

  return c.json(tasks, 200);
};

export const getSpecificRoute = createRoute({
  method: "get",
  path: "/tasks/{id}",
  tags: ["Tasks"],
  summary: "List of Specific tasks",
  description: "Retrieve list of Specific tasks.",
  request: {
    params: taskParamsSchema.params,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
      description: "Retrieve Task",
    },
  },
});

export const getTaskHandler: Handler = async (c) => {
  const { id } = c.req.param();

  const task = await getTaskData(id);
  return c.json(task, 200);
};

export const createTaskRoute = createRoute({
  method: "post",
  path: "/tasks",
  tags: ["Tasks"],
  summary: "Created task",
  description: "Retrieve Created task.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createTaskSchema.body,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
      description: "Retrieve Created Task",
    },
  },
});

export const createTaskHandler: Handler = async (c) => {
  const body = await c.req.json();

  const taskCreated = await createTaskData(body);

  return c.json(taskCreated, 201);
};

export const updateSpecificRoute = createRoute({
  method: "put",
  path: "/tasks/{id}",
  tags: ["Tasks"],
  summary: "Update task",
  description: "Retrieve Updated task.",
  request: {
    params: taskParamsSchema.params,
    body: {
      content: {
        "application/json": {
          schema: updateTaskSchema.body,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
      description: "Retrieve Updated Task",
    },
  },
});

export const updateTaskHandler: Handler = async (c) => {
  const body = await c.req.json();
  const { id } = c.req.param();

  const updatedTask = await updateTaskData(id, body);

  return c.json(updatedTask, 200);
};

export const deleteSpecificRoute = createRoute({
  method: "delete",
  path: "/tasks/{id}",
  tags: ["Tasks"],
  summary: "Delete task",
  description: "Retrieve Delete Specific tasks.",
  request: {
    params: taskParamsSchema.params,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
      description: "Retrieve Task",
    },
  },
});

export const deleteTaskHandler: Handler = async (c) => {
  const { id } = c.req.param();

  const deletedTask = await deleteTaskData(id);

  return c.json(deletedTask, 200);
};
