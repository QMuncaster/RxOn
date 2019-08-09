import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { minLength, maxLength, required } from './validationFunctions';
import LoginFormInput from './LoginFormInput';
import Button from '@material-ui/core/Button';
import '../styling/LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // handleSubmit prop is passed by redux-form automatically.
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
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    id="submit_btn"
                    type="submit"
                    className="loginForm__btn"
                    disabled={this.props.isSubmitDisabled}
                >
                    Log In
                </Button>
                <p className="loginForm__signup">
                    Not a member? Sign up <a href="/signup">here.</a>
                </p>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
})(LoginForm);
