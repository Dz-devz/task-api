import { default as taskRoutes } from "./task/routes";

export const routes = [taskRoutes] as const;

export type AppRoutes = (typeof routes)[number];
