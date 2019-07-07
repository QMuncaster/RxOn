import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import '../styling/PatientSideBar.css';

class PatientSideBar extends Component {

    render() {
        return (
            <div className="patient-sidebar">
                <div className="info-section">
                        <div className="profile-userpic">
					        <img className="img-responsive" alt=""/>
				        </div>
                    <div className="gender-section">
                        <ul>

                        {this.props.currentUser ?
                            <li className="listItem"> First Name: {this.props.currentUser.firstname}  </li> : ''}

                        {this.props.currentUser ?
                            <li className="listItem"> Last Name: {this.props.currentUser.lastname}  </li> : ''}
                            
                        {this.props.currentUser ?
                            <li className="listItem"> Date of Birth: {this.props.currentUser.dateofbirth} </li> : ''}

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

