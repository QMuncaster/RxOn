import React, { Component } from "react";
import "../styling/Login.css"
import LoginForm from "./LoginForm";
import { SubmissionError } from "redux-form";
import pify from 'pify';

class Login extends Component {

  // dummy example for how to connect server handleSubmit
  // this is where server logic for handling submission can sit
  handleLoginSubmit = async (values) => {
    try {
      // I had to convert login function to a promise instead of using its callback
      // Otherwise the callback would lose the SubmissionError functionality for showing on form
      // I tried using Meteor's callAsync to make it sync but then it couldn't handle errors...
      await pify(Meteor.loginWithPassword)({ email: values.userName }, values.password);
      this.props.history.push('/home');
    } catch (error) {
        switch (error.reason) {
          // kind of uncomfortable that we have to hardcode to the reason
          // but they share the same status codes
          case "User not found":
            throw new SubmissionError({
              userName: error.reason
            });

          case "Incorrect password":
            throw new SubmissionError({
              password: error.reason
            });

          default:
            throw new SubmissionError({
              userName: error.reason,
              password: error.reason
            });
        }
      }
  }

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


