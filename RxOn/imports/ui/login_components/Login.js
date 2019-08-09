import React, { Component } from 'react';
import pify from 'pify';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import '../styling/Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isSubmitDisabled: false,
        };
    }

    handleLoginSubmit = async values => {
        this.setState({ isSubmitDisabled: true });

        try {
            // login function using a promise instead of using its callback
            // Otherwise the callback would lose the SubmissionError functionality for showing error on form
            await pify(Meteor.loginWithPassword)(
                { email: values.userName },
                values.password
            );
            this.props.history.push('/home');
        } catch (error) {
            this.setState({ isSubmitDisabled: false });
            throw new SubmissionError({
                password: 'Invalid login.',
            });
        }
    };

    handleCreateAccount = () => {
        this.props.history.push('/signup');
    };

    render() {
        return (
            <div>
                <div className="Login Login-header">
                    <h1 className="Login__header">RxOn Login</h1>
                    <div className="Login_form">
                        <LoginForm
                            onSubmit={this.handleLoginSubmit}
                            isSubmitDisabled={this.state.isSubmitDisabled}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
