import React, { Component } from "react";
import "../styling/Login.css"
import { SubmissionError } from "redux-form";
import pify from 'pify';
import { withRouter } from "react-router-dom";
import SignupForm from "./SignupForm";


class Signup extends Component {

handleSubmit = async (values) => {
    document.getElementById("submit_btn").disabled = true;
    try {
        await pify(Accounts.createUser)({
            email: email.value,
            password: password.value,
            profile: {
                firstname: firstname.value,
                lastname: lastname.value,
                address: address.value,
            }});
            this.props.history.push('/home');
    } catch (error) {
        document.getElementById("submit_btn").disabled = false;
        console.log(error);
        throw new SubmissionError({
            password: error
        });
    }
}

render() {
    return (
        <div>
            <div className="Login Login-header">
                <h1 className="Login__header">RxOn Signup</h1>
                <SignupForm onSubmit={this.handleSubmit} />
            </div>
        </div>
    );
}
}

export default withRouter(Signup);