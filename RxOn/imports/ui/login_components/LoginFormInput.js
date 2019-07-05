/*
This is a custom stateless component to avoid repeated markup
So I have abstracted away all markup stuff to a custom component
We could have put all this into LoginForm direclty
*/
import React from "react";
const loginFormInput = props => {
  const { name, label, input, type, meta } = props;
  return (
    <div className="loginForm__wrapper">
      <label htmlFor={name} className="loginForm__label">
        {label}
      </label>
      <input {...input} className="loginForm__input" type={type} />
      {meta.error && meta.touched && (
        <div style={{ color: "red", fontSize: "0.8rem" }}>{meta.error}</div>
      )}
    </div>
  );
};

export default loginFormInput;
