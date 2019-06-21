import { Users } from '../api/users.js';
import React, { Component } from 'react';
import "./styling/LoginPage.css";
import PatientPage from "./PatientPage";
import PharmacyProfile from "./PharmacyProfile";


export default class LoginPage extends Component {

    state ={
        userType: "patient"
    }

    updateUserType =(event) =>{
        this.setState({userType:event.target.value});
    }

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
        if (this.state.userType==="patient") {
            this.props.history.push('/patient/profile');
        } else {
            this.props.history.push('/pharmacy/profile');
        }
    }


    render() {
        return (

            <form>
                <input type="radio" name="user type " value="patient" defaultChecked onChange={this.updateUserType}/> Patient
                <input type="radio" name="user type " value="pharmacy" onChange={this.updateUserType}/> Pharmacy
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
