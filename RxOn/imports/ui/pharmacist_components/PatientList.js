import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import IndividualPatient from './IndividualPatient';

class PatientList extends Component {


    renderPatients() {
        return this.props.users.map((user) => {
            //only show users who are patients, not pharamcies
            if (user.roles != 'admin') {
                    return <IndividualPatient key={user._id} user={user} />
                }
            }
        );
    }


    render() {
            return (
                <div className="pharmacy-profile-page-heading" >
                    <div className="pharmacy-profile-page">
                        <div  className="Pharmacy-Headings">
                            <h2 id="pharmHeading" className="prescription-header-individual"> Patient List </h2>
                            <div id="pendingBox">
                                <ul>
                            {this.renderPatients()}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }



export default withTracker(() => {
    Meteor.subscribe('userList');

    return {
        users: Meteor.users.find({}, {
            sort: {lastname: 1}}).fetch()
    };
})(PatientList);
