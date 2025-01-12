export const TaskType = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type TaskType = (typeof TaskType)[keyof typeof TaskType];
