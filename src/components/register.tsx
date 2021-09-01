import { useFormik } from "formik";
import * as Yup from "yup";
import { PartialUser } from "../App";

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const Register = ({
  performRegisterAction,
}: {
  performRegisterAction: (user: PartialUser) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (val) => {
      performRegisterAction(val);
    },
    validationSchema: RegisterSchema,
  });

  return (
    <div className="mt-5">
        <h3>Register</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${formik.errors.userName && "is-invalid"}`}
            id="userName"
            aria-describedby="username-help"
            name="userName"
            onChange={formik.handleChange}
          />
          <div id="username-help" className="form-text">
            We'll never share your user name with anyone else.
          </div>
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {formik.errors.userName}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${formik.errors.password && "is-invalid"}`}
            id="password"
            name="password"
            onChange={formik.handleChange}
          />
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            {formik.errors.password}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
