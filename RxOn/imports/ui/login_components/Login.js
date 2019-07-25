import React, { Component } from "react";
import "../styling/Login.css"
import LoginForm from "./LoginForm";
import { SubmissionError } from "redux-form";
import pify from 'pify';
import { withRouter } from "react-router-dom";

class Login extends Component {

  handleLoginSubmit = async (values) => {
    try {
      // I had to convert login function to a promise instead of using its callback
      // Otherwise the callback would lose the SubmissionError functionality for showing error on form
      // I tried using Meteor's callAsync to make it sync but then it couldn't handle errors...
      await pify(Meteor.loginWithPassword)({ email: values.userName }, values.password);
      this.props.history.push('/home');
    } catch (error) {
      throw new SubmissionError({
        password: "Invalid login."
      });
    }
  }

  handleCreateAccount = () => {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <div>
        <div className="Login Login-header">
          <h1 className="Login__header">RxOn Login</h1>
          <LoginForm onSubmit={this.handleLoginSubmit} />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);