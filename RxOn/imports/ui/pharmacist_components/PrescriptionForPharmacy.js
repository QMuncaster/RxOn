import React, {Component} from 'react';
import "../styling/PharmacyPrescription";
import { withTracker } from 'meteor/react-meteor-data';


class PrescriptionForPharmacy extends Component {

    // cond: id matches, the the status will be set to "filled"
    //mangoDB update record; uses model to update

    fillPrescription() {
        Meteor.call('prescriptions.fill', this.props.prescription._id);
    }


    render() {
        var fillingButton;
        if (this.props.prescription.status === "pending") {
            fillingButton = (
                <div className="filling" >
                    <button id="fillButton" className="filling" onClick={this.fillPrescription.bind(this)}>
                        Fill It
                    </button>
                </div>
            );
        }


        return (
            <div id="rxForm" className="admin-prescription-form ">
                
                <div id="username" className="usernameForRx"> 
                {this.props.prescription.patientId}
                </div>
                
                <div id="rxInfo" className="prescription-middle-info">
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Name:   </span>
                        {this.props.prescription.rxName}
                    </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Strength:   </span>
                        {this.props.prescription.rxStrength}
                    </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Dose:   </span>
                        {this.props.prescription.rxDose} </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Date:   </span>
                        {this.props.prescription.createdAt.toString("en-US")} </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Status:   </span>
                        {this.props.prescription.status} </div>
                </div>
                {fillingButton}
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('userData');

    return {
        currentUser: Meteor.user()
    };
})(PrescriptionForPharmacy);