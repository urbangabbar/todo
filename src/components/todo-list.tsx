import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoList, User } from "../indexDB";
import { updateTasks } from "../store/task";
import { UpsertModal } from "./upsert-modal";

export type Task = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

export const TodoList = () => {
  const user:User = useSelector((state:any) => state.user)
  const tasks = user.todoList;
  const dispatch = useDispatch();

  const [isModalOpen, openModal] = useState<boolean>(false);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const closeModal = () => {
    setTaskToEdit(null);
    openModal(false);
  };

  const addNewTask = async (newTask: Task) => {
    dispatch(updateTasks(user.id,[...tasks, newTask]))
  };

  const enableEditTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const editTask = async (editTask: Task) => {
    const index = tasks.findIndex((el) => el.id === editTask.id);
    const tasksCopy = [...tasks];
    tasksCopy[index] = editTask;
    dispatch(updateTasks(user.id,tasksCopy));
  };

  const changeTaskStatus = (task:Task,status: boolean)=>{
   editTask({...task, completed: status}) 
  }

  const deleteTask = (taskId:string)=>{
    const tasksCopy = [...tasks];
    const index = tasksCopy.findIndex(el => el.id === taskId);
    if (index > -1) {
      tasksCopy.splice(index, 1);
    }
    dispatch(updateTasks(user.id,tasksCopy));
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        className="btn btn-success mb-5"
        onClick={() => openModal(true)}
      >
        Add new task
      </button>
      <div className="row">
        <div className="column">
          <h4 className="mb-4">TODO</h4>
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                enableEditTask={enableEditTask}
                changeTaskStatus={changeTaskStatus}
                deleteTask={deleteTask}
              />
            ))}
        </div>
        <div className="column">
          <h4 className="mb-4">COMPLETED</h4>
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                enableEditTask={enableEditTask}
                changeTaskStatus={changeTaskStatus}
                deleteTask={deleteTask}
              />
            ))}
        </div>
      </div>
      {(isModalOpen || !!taskToEdit?.id) && (
        <UpsertModal
          modalIsOpen={isModalOpen || !!taskToEdit?.id}
          closeModal={closeModal}
          addNewTask={addNewTask}
          task={taskToEdit?.id ? taskToEdit : undefined}
          editTask={editTask}
        />
      )}
    </div>
  );
};

const TaskCard = React.memo(({
  task,
  enableEditTask,
  changeTaskStatus,
  deleteTask
}: {
  task: Task;
  enableEditTask: (task: Task) => void;
  changeTaskStatus: (task:Task,status:boolean)=> void,
  deleteTask: (taskid: string) => void;
}) => {
  return (
    <div className="card todo-card mb-3">
      <div className="card-body">
        <h5 className="card-title">{task.name}</h5>
        <p className="card-text">{task.description}</p>
        <button type="button" className="btn btn-primary mx-1" onClick={()=> changeTaskStatus(task,!task.completed)}>
          {!task.completed ? "Complete" : "Todo"}
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={() => enableEditTask(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
