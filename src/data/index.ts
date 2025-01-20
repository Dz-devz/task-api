import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../utils/errors";

const prisma = new PrismaClient();

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

export async function getTasksData() {
  const allTask = await prisma.task.findMany();

  return allTask;
}

export async function getTaskData(id: string) {
  // const task = tasks.find((task) => task.id === id);
  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    throw new NotFoundError("User not found");
  }

  return task;
}

export async function createTaskData(payload: {
  title: string;
  description: string;
  status: "PENDING";
  priority: number;
}) {
  const createTask = await prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      status: payload.status,
    },
  });
  // const newTask = {
  //   id: tasks.length + 1,
  //   title: payload.title,
  //   description: payload.description,
  //   status: payload.status,
  //   priority: payload.priority,
  // };
  // tasks.push(newTask);
  return createTask;
}

export async function updateTaskData(
  id: string,
  payload: {
    title: string;
    description: string;
    status: "PENDING";
    priority: number;
  }
) {
  // const updatedTask = tasks.find((task) => task.id === id);

  const updatedTask = await prisma.task.update({
    where: { id: id },
    data: {
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      status: payload.status,
    },
  });

  if (!updatedTask) {
    throw new NotFoundError("User not found");
  }

  // updatedTask.title = payload.title;
  // updatedTask.description = payload.description;
  // updatedTask.status = payload.status;
  // updatedTask.priority = payload.priority;

  return updatedTask;
}

export async function deleteTaskData(id: string) {
  // const task = tasks.find((task) => task.id === id);

  const deletedTask = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (!deletedTask) {
    throw new NotFoundError("User not found");
  }
  // tasks = tasks.filter((task) => task.id !== id);

  return deletedTask;
}
