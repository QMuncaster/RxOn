import React, { Component } from 'react';
import './styling/SignUpPage.css';


export default class SignupPage extends Component {

    constructor() {
        super();
        // lock to avoid spamming create request
        this.state = { isRequesting: false };
    }

    createProfile() {
        if (!this.state.isRequesting) { 
            this.setState({ isRequesting: true });
            Accounts.createUser({
                email: email.value,
                password: password.value,
                profile: {
                    firstname: firstname.value,
                    lastname: lastname.value,
                    address: address.value,
                    phonenumber: phonenumber.value,
                    //gender: gender.value,
                    dateofbirth: dateofbirth.value,
                    //city: city.value,
                    //country: country.value
                }
            },
                (error) => {
                    if (error) {
                        alert(error);
                        this.setState({ isRequesting: false });
                    }
                    else {
                        this.props.history.push('/home')
                    }
                });
        }
    }

    render() {
        return (
            <div className="profile-page">
                <h2>Create Account </h2>
                <div className="names-section">
                    <div className="image-section">

                        {/*<a href="#">Change Image</a>*/}
                    </div>
                    <div className="name-section">
                        <div className="gender-section">
                            <label htmlFor="mr">Mr.</label>
                            <input type="radio" id="mr" name="gender-radio-group" value="mr" defaultChecked />
                            <label htmlFor="mrs">Mrs.</label>
                            <input type="radio" id="mrs" name="gender-radio-group" value="mrs" />
                            <label htmlFor="mx">Mx.</label>
                            <input type="radio" id="mx" name="gender-radio-group" value="mx" />
                        </div>
                        <div className="firstname-section">
                            <label>First Name:</label>
                            <input type="text" id="firstname" />
                        </div>
                        <div className="lastname-section">
                            <label>Last Name:</label>
                            <input type="text" id="lastname" />
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    <span>
                        <label>Address:</label>
                        <input type="text" id="address" />
                    </span>

                    <span>
                        <label>City:</label>
                        <input type="text" id="city" />

                        <label>Country:</label>
                        <input type="text" id="country" />
                    </span>

                    <span>
                        <label>Phone Number:</label>
                        <input type="text" id="phonenumber" />
                    </span>

                    <span>
                        <label>Email:</label>
                        <input type="email" id="email" />

                        <label>Password:</label>
                        <input type="email" id="password" />
                    </span>
                </div>

                <div className="emergency-section">

                </div>

                <div className="action-buttons-section">
                    <button className="ui button update-button" onClick={() => this.createProfile()}> Create Account </button>
                </div>

            </div>

        );
    }
}
