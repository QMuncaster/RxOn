import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { minLength, maxLength, required } from "./validation";
import LoginFormInput from "../login_components/LoginFormInput";
import "../styling/LoginForm.css";

class SignupForm extends Component {

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
        <button type="submit" className="loginForm__btn" id="submit_btn">
          Log In
        </button>
        <p className="loginForm__signup">Not a member? Sign up <a href="/signup">here.</a></p>
      </form>
    );
  }
}

export default reduxForm({
  form: "login"
})(SignupForm);
