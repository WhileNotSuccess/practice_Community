import React, { useState } from "react";
import { useAuth } from "../hooks/auth";
import "../css/SignInComp.css";
const SignIn = () => {
  const [inputs, setInputs] = useState({
    nickName: "",
    email: "",
    password: "",
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/user-test",
  });
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

    register({
      ...inputs,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return (
    <form onSubmit={onSubmit} className="container">
      <input
        type="text"
        name="nickName"
        value={inputs.nickName}
        onChange={onChange}
        placeholder=" nickName"
        className="loginInput"
      />
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
      <input
        type="password"
        name="confirmPassword"
        value={passwordConfirmation}
        onChange={(e) => {
          setPasswordConfirmation(e.target.value);
        }}
        placeholder=" Confirm Password"
        className="loginInput"
        minLength={8}
      />

      {errors.email?.length > 0 &&
        errors.email.map((item, index) => {
          return (
            <p className="error" key={index}>
              {item}
            </p>
          );
        })}
      {passwordConfirmation !== inputs.password ? (
        <p className="error">비밀번호가 일치하지 않습니다.</p>
      ) : null}
      <button type="submit" className="loginButton">
        Register
      </button>
    </form>
  );
};

export default SignIn;
