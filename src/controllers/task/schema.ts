import { z } from "@hono/zod-openapi";
import { TaskType } from "../../db/types";

export const taskSchema = z.object({
  id: z.string().cuid(),
  title: z.string().openapi({
    example: "Sample Title",
  }),
  description: z.string().optional().openapi({
    example: "Sample Description",
  }),
  status: z.nativeEnum(TaskType).openapi({
    example: TaskType.PENDING,
  }),
  // priority: z.number().openapi({
  //   example: 0,
  // }),
  created_at: z.union([z.coerce.date(), z.string()]).openapi({
    example: new Date().toISOString(),
  }),
  updated_at: z.union([z.coerce.date(), z.string()]).openapi({
    example: new Date().toISOString(),
  }),
  deleted_at: z.union([z.coerce.date(), z.string()]).nullable().openapi({
    example: new Date().toISOString(),
  }),
});
