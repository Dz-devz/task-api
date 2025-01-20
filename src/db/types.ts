export const TaskType = {
  PENDING: "PENDING",
  IN_PROGRESS: "PROCESSING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type TaskType = (typeof TaskType)[keyof typeof TaskType];
