
import { Users } from '../api/users.js';
import React, { Component } from 'react';


class LoginPage extends Component {

    createAccount() {
        Users.insert({
            userType,
            UserID,
            date: new Date(),

        });
        //TODO:
        FlowRouter.go('/createaccount');
    }

    loginAccount(){
        //TODO:
        FlowRouter.go('/patientpage');
    }


    render() {
        return (

            <form>
                <input type="radio" className="user type patient"/> Patient
                <input type="radio" className="user type pharmacy"/> Pharmacy
                <p>
                    <label className="email box">
                        Email:
                        <input className={"email content"}/>
                    </label>
                </p>
                <p>
                    <label className="password box">
                        Password:
                        <input type="password" className={"email content"}/>
                    </label>
                </p>
                <p>
                    <button className="ui button create account" onClick={() => {
                        this.createAccount()
                    }}>
                        Create Account
                    </button>
                    <button className="ui button login" onClick={this.loginAccount()}> Login</button>
                </p>
            </form>
        );

    }
}

export default LoginPage;