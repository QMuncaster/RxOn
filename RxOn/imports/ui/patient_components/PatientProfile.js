import React, {Component} from 'react';
import  faker from 'faker';
import { withTracker } from 'meteor/react-meteor-data';
import "../styling/PatientProfile.css";

 class PatientProfile extends Component {

    updateProfile() {
        // Patients.update({
        //     userType,
        //     UserID,
        //     date: new Date(),
        // });
        //TODO: remember update patient's firstname and lastname in prescriptions as well
    }


    render() {
        return (
            <div className="profile-page">
                <h2>Your Profile</h2>
                <div className="names-section">
                    <div className="image-section">
                        <img  src={faker.image.avatar()} alt ="user selfie"/>
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
                                {this.props.currentUser ?
                                    <input type="text" id="firstname" placeholder={this.props.currentUser.firstname}  />
                                    :
                                    <input type="text" id="firstname" placeholder="enter first name"/>
                                }
                        </div>

                        <div className="lastname-section">
                            <label>Last Name:</label>
                                {this.props.currentUser ?
                                    <input type="text" id="lastname" placeholder={this.props.currentUser.lastname}  />
                                    :
                                    <input type="text" id="lastname" placeholder="enter last name"/>
                                }
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
                        <input type="text" id="phone-part1" />
                        <input type="text" id="phone-part2" />
                        <input type="text" id="phone-part3" />

                        <label>Email:</label>
                        <input type="email" id="email" />
                    </span>
                </div>

                <div className="emergency-section">

                </div>

                <div className="action-buttons-section">
                    <button className="ui button update-button" onClick={() => this.updateProfile()}> Update</button>
                </div>

            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('userData');

    return {
        currentUser: Meteor.user()
    };
})(PatientProfile);
