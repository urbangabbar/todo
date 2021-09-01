import { Task } from "../components/todo-list";
import { updateTodoList } from "../indexDB";
import { updateTask } from "./user-reducer";

export const updateTasks = (userid: string, tasks: Task[]) => {
  return async (dispatch: Function) => {
    await updateTodoList(userid,tasks);
    dispatch(updateTask(tasks))
  };
};