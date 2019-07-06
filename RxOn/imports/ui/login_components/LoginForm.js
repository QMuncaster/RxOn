import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { minLength, maxLength, required } from "./validation";
import LoginFormInput from "./LoginFormInput";
import "../styling/LoginForm.css";

class LoginForm extends Component {
  // handleSubmit prop is passed by redux-form automatically.
  // For it to work we need to pass our own submit logic to the component
  // I did so in Login.js where I passed a dummy logic handleLoginSubmit
  // we can then use handleSubmit for a lot of functionality
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="loginForm">
        <Field
          name="userName"
          type="text"
          component={LoginFormInput}
          label="Email"
          className="loginForm__input"
          validate={[required, minLength, maxLength]}
        />
        <Field
          name="password"
          type="password"
          component={LoginFormInput}
          label="Password"
          className="loginForm__input"
          validate={[required]}
        />
        <Field
          name="remember"
          type="checkbox"
          component={LoginFormInput}
          label="Remember me?"
          className="loginForm__input--inline"
        />
        <button type="submit" className="loginForm__btn">
          Log In
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "login"
})(LoginForm);
