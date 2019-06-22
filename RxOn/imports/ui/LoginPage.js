
import { Users } from '../api/users.js';
import React, { Component } from 'react';
import "./styling/LoginPage.css";
import PatientPage from "./PatientPage";
import PharmacyProfile from "./PharmacyProfile";


export default class LoginPage extends Component {

    state = {
        userType: "patient"
    }

    updateUserType = (event) => {
        this.setState({ userType: event.target.value });
    }

    createAccount = () => {
        this.props.history.push('/signup');
        // Users.insert({
        //     userType,
        //     UserID,
        //     date: new Date(),
        //
        // });
    }

    loginAccount = () => {
        if (this.state.userType === "patient") {
            this.props.history.push('/patient/profile');
        } else {
            this.props.history.push('/pharmacy/profile');
        }
    }


    render() {
        return (

            <div class="wrapper fadeInDown">
                <div id="formContent">

                <div class="fadeIn first">
                    <img src="./styling/rxon.png" id="icon" alt="logo" width="42" height="42"/>
                </div>

                <form>
                    <input type="radio" name="user type " value="patient" defaultChecked onChange={this.updateUserType} /> Patient
                    <input type="radio" name="user type " value="pharmacy" onChange={this.updateUserType} /> Pharmacy
                    <input className={"email content"} type="text" id="email" class="fadeIn second" name="email" placeholder="email"/>
                    <input className={"email content"} type="text" id="password" class="fadeIn third" name="login" placeholder="password"/>
                    <input onClick={this.loginAccount} type="submit" class="fadeIn fourth" value="Log In"/>

                    <button id="buttonCreateAccount" class="fadeIn fourth"  className="ui button create account" onClick={this.createAccount}>
                        Create Account
                    </button>
                </form>

                <div id="formFooter">
                    <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
            </div>

        );

    }
}
