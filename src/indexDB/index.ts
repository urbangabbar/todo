import Dexie from "dexie";
import { PartialUser } from "../App";
import { Task } from "../components/todo-list";

export const db = new Dexie("user-todo");

export type User = {
  id: string;
  userName: string;
  password: string;
  todoList: Task[];
};

db.version(1).stores({ users: "++id,userName,password,todoList" });

export const addUserToDb = async (user: PartialUser) => {
  await (db as any).users.add({
    userName: user.userName,
    password: user.password,
    todoList: [],
  });
};

export const updateTodoList = async (id: string, todoList: Task[]) => {
  await (db as any).users.update(id, { todoList });
};

export const getUser = async (userName: string, password: string) => {
  const result = await (db as any).users.where({ userName, password }).first();
  return result
};
