import React, { useState } from "react";
import { useAuth } from "../hooks/auth";
import "../css/LoginComp.css";
const Login = () => {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/user-test",
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const onChange = (e) => {
    let { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    login({
      ...inputs,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };
  return (
    <>
      {status}
      <form onSubmit={onSubmit} className="lContainer">
        <div className="content">
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={onChange}
            placeholder=" Email"
            className="loginInput"
          />

          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={onChange}
            placeholder=" Password"
            className="loginInput"
            minLength={8}
          />
        </div>

        {errors.email?.length > 0 &&
          errors.email.map((item, index) => {
            return (
              <p className="error" key={index}>
                {item}
              </p>
            );
          })}

        <button type="submit" className="loginButton">
          Login
        </button>
        <div className="block mt-4">
          <label htmlFor="remember_me">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              onChange={(event) => setShouldRemember(event.target.checked)}
            />
            Remember me
          </label>
        </div>

        <a href="/sign-in">Sign in</a>
      </form>
    </>
  );
};

export default Login;
