import { useState } from "react";
import { UpsertModal } from "./upsert-modal";

export const TodoList = () => {
    const [isModalOpen,openModal] = useState<boolean>(false);

  return (
    <div className="mt-5">
    <button type="button" className="btn btn-success mb-5" onClick={() => openModal(true)}>Add new task</button>
      <div className="row">
        <div className="column">
          <h4 className="mb-4">TODO</h4>
          <Card title="Go to gym" description="go to gym" completed={false} />
        </div>
        <div className="column">
          <h4 className="mb-4">COMPLETED</h4>
          <Card title="Go to gym" description="go to gym" completed={true} />
        </div>
      </div>
      <UpsertModal modalIsOpen={isModalOpen}/>
    </div>
  );
};

const Card = ({
  title,
  description,
  completed,
}: {
  title: string;
  description: string;
  completed: boolean;
}) => {
  return (
    <div className="card todo-card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button type="button" className="btn btn-primary mx-1">
          {!completed ? "Complete" : "Todo"}
        </button>
        <button type="button" className="btn btn-secondary mx-1">
          Edit
        </button>
      </div>
    </div>
  );
};
