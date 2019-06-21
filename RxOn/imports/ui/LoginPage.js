import React, { Component } from 'react';
import "./styling/LoginPage.css";

export default class LoginPage extends Component {

    state = {
        userType: "patient",
        email: "",
        password: "",
    }

    updateUserType = (event) => {
        this.setState({ userType: event.target.value });
    }

    // using react to get this info & store as state is kind of bloated
    // TODO: replace with findReactDOM
    handleEmailInput = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordInput = (event) => {
        this.setState({ password: event.target.value });
    }

    createAccount = (event) => {
        event.preventDefault();
        this.props.history.push('/signup');
    }

    loginAccount = (event) => {
        event.preventDefault();
        Meteor.loginWithPassword({email: this.state.email}, this.state.password, (error) => {
            if (error) {
                alert(error.reason);
            }
            else {
                this.props.history.push('/home')
            }
        });
        // if (this.state.userType === "patient") {
        //     this.props.history.push('/patient/profile');
        // } else {
        //     this.props.history.push('/pharmacy/profile');
        // }
    }

    render() {
        return (

            <div className="wrapper fadeInDown">
                <div id="formContent">

                <div className="fadeIn first">
                    <img src="./styling/rxon.png" id="icon" alt="logo" width="42" height="42"/>
                </div>

                <form>
                    <input type="radio" name="user type " value="patient" defaultChecked onChange={this.updateUserType} /> Patient
                    <input type="radio" name="user type " value="pharmacy" onChange={this.updateUserType} /> Pharmacy
                    <input className={"email content"} type="text" id="email" className="fadeIn second" name="email" placeholder="email"
                        value={this.state.email} onChange={this.handleEmailInput}/>
                    <input className={"email content"} type="text" id="password" className="fadeIn third" name="login" placeholder="password"
                        value={this.state.password} onChange={this.handlePasswordInput}/>
                    <input onClick={this.loginAccount} type="submit" className="fadeIn fourth" value="Log In"/>

                    <button id="buttonCreateAccount" className="fadeIn fourth"  className="ui button create account" onClick={this.createAccount}>
                        Create Account
                    </button>
                </form>

                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
            </div>

        );

    }
}
