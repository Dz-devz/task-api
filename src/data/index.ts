import { NotFoundError } from "../utils/errors";

let tasks = [
  {
    id: 1,
    title: "Darwin Task",
    description: "Coding",
    status: "PENDING",
    priority: 5,
  },
  {
    id: 2,
    title: "Letsgo Task",
    description: "Fooding",
    status: "IN_PROGRESS",
    priority: 8,
  },
  {
    id: 3,
    title: "Go Task",
    description: "Testing",
    status: "COMPLETED",
    priority: 0,
  },
];

export function getTasksData() {
  return tasks;
}

export function getTaskData(id: number) {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    throw new NotFoundError("User not found");
  }

  return task;
}

export function createTaskData(payload: {
  title: string;
  description: string;
  status: string;
  priority: number;
}) {
  const newTask = {
    id: tasks.length + 1,
    title: payload.title,
    description: payload.description,
    status: payload.status,
    priority: payload.priority,
  };
  tasks.push(newTask);
  return newTask;
}

export function updateTaskData(
  id: number,
  payload: {
    title: string;
    description: string;
    status: string;
    priority: number;
  }
) {
  const updatedTask = tasks.find((task) => task.id === id);

  if (!updatedTask) {
    throw new NotFoundError("User not found");
  }

  updatedTask.title = payload.title;
  updatedTask.description = payload.description;
  updatedTask.status = payload.status;
  updatedTask.priority = payload.priority;

  return updatedTask;
}

export function deleteTaskData(id: number) {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    throw new NotFoundError("User not found");
  }
  tasks = tasks.filter((task) => task.id === id);

  return task;
}
