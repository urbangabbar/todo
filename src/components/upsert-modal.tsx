import { useFormik } from "formik";
import Modal from "react-modal";
import { Task } from "./todo-list";
import * as Yup from "yup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

export const UpsertModal = ({
  modalIsOpen,
  closeModal,
  addNewTask,
  task,
  editTask,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  addNewTask: (task: Task) => void;
  task: Task | undefined;
  editTask: (task: Task) => void;
}) => {
  const closeAndReset = () => {
    formik.resetForm();
    closeModal();
  };
  const initialValues = task?.id
    ? { ...task }
    : {
        name: "",
        description: "",
        id: generateRandomId(),
        completed: false,
      };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      if (task?.id) {
        editTask(val);
      } else {
        addNewTask(val);
      }
      closeAndReset();
    },
    validationSchema: taskSchema
  });

  return (
    <Modal isOpen={modalIsOpen} contentLabel="Modal" style={customStyles}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {task ? "Update Task" : "Add new Task"}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeAndReset}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${formik.errors.name && "is-invalid"}`}
                id="name"
                aria-describedby="name-help"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <div
                id="validationServernameFeedback"
                className="invalid-feedback"
              >
                {formik.errors.name}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <input
                type="description"
                className={`form-control ${
                  formik.errors.description && "is-invalid"
                }`}
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              <div
                id="validationServernameFeedback"
                className="invalid-feedback"
              >
                {formik.errors.description}
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            Save changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={closeAndReset}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const generateRandomId = (): string => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
