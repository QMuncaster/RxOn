import React, { Component } from "react";
import "../styling/Login.css"
import LoginForm from "./LoginForm";
import { SubmissionError } from "redux-form";

class Login extends Component {
  // dummy example for how to connect server handleSubmit
  // this is where server logic for handling submission can sit
  handleLoginSubmit = (values) => {
    // example of handling error from a server request
    if (values.userName === "omar") {
        // SubmissionError is a error prop provided by redux form
      throw new SubmissionError({
        userName: "This username is already in use"
      });
    } else {
      // if request is successful
      console.log("form submitted", values);
    }
  };
  render() {
    return (
      <div className="Login Login-header">
        <h1 className="Login__header">Login Page</h1>
        <LoginForm onSubmit={this.handleLoginSubmit} />
      </div>
    );
  }
}
export default Login;
