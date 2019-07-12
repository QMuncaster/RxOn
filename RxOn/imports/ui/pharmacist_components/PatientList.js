import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import "../styling/PharmacyPrescription";
import PharmacySidebar from "./PharmacySidebar";
import IndividualPatient from './IndividualPatient';

class PatientList extends Component {

    renderPatients() {
            return this.props.users.map((user) => {
                        return <IndividualPatient key={user._id} user={user}/>
                    }
            );
        }

    render() {
            return (
                <div className="pharmacy-profile-page-heading" >
                    <PharmacySidebar/>
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
        users: Meteor.users.find({})
    };
})(PatientList);
