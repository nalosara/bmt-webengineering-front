import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type RegistrationProps = {};

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
};

const schema = yup
  .object({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    username: yup.string().min(6).max(20).required(),
    password: yup.string().min(8).required(),
  })
  .required();

function Registration({}: RegistrationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const { loading, userToken, error, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (success) navigate("/login");
    if (userToken) navigate("/home");
  }, [navigate, userToken, success]);

  return (
    <div className="col-12 justify-content-center align-items-center vw-100">
      <div className="container-fluid">
        <img src="/images/BeMyTECH-cropped.png" width="300" alt="" style={{ marginTop: 100}}/>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Unable to render data!</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Something went wrong, please try again.</p>
        </div>
      )}
      <div className="card p-2 justify-content-center align-items-center border-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 has-validation">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              {...register("firstName")}
            />
            {errors.firstName && (
              <small style={{ color: "red" }}>{errors.firstName.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              {...register("lastName")}
            />
            {errors.lastName && (
              <small style={{ color: "red" }}>{errors.lastName.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              {...register("username")}
            />
            {errors.username && (
              <small style={{ color: "red" }}>{errors.username.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              {...register("email")}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password")}
            />
            {errors.password && (
              <small style={{ color: "red" }}>{errors.password.message}</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
