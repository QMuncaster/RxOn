import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import './styling/Navbar.css'
import { withTracker } from 'meteor/react-meteor-data';

class PatientSideBar extends Component {

    render() {
        return (
            <div className="pharmacy-sidebar">
                <div className="info-section">
                    <div className="gender-section">
                        <ul>

                        {this.props.currentUser ?
                            <li> First Name: {this.props.currentUser.firstname}  </li> : ''}

                        {this.props.currentUser ?
                            <li> Last Name: {this.props.currentUser.lastname}  </li> : ''}
                            
                        {this.props.currentUser ?
                            <li> Date of Birth: {this.props.currentUser.dateofbirth} </li> : ''}

                        </ul>
                     </div>
                </div>
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('userData');

    return {
        currentUser: Meteor.user()
    };
})(PatientSideBar);

