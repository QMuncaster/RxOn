
import { Users } from '../api/users.js';
import React, { Component } from 'react';
import "./styling/LoginPage.css";
import PatientPage from "./PatientPage";


export default class LoginPage extends Component {

    createAccount= () => {
        this.props.history.push('/signup');
        // Users.insert({
        //     userType,
        //     UserID,
        //     date: new Date(),
        //
        // });
    }

    loginAccount=() =>{
        //TODO:
        // if ()
        this.props.history.push('/patient/profile');
        // true ? (
        //     <Redirect to="/patient"/>
        // ) : (
        //     <PatientPage/>
        // )
    }


    render() {
        return (

            <form>
                <input type="radio" name="user type " defaultChecked/> Patient
                <input type="radio" name="user type "/> Pharmacy
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
                <div className="buttons-section">
                    <button  className="ui button login" onClick={this.loginAccount}> Login
                    </button>
                    <button  className="ui button create account" onClick= {this.createAccount}>
                        Create Account
                    </button>
                </div>
            </form>

        );

    }
}
