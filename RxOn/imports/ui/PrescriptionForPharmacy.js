import React, {Component} from 'react';
import {Prescriptions} from '../collections/prescriptions.js';
import "./styling/PharmacyPrescription";


export default class PrescriptionForPharmacy extends Component {

    // cond: id matches, the the status will be set to "filled"
    //mangoDB update record; uses model to update

    fillPrescription(prescription) {
        Prescriptions.update({_id: this.props.prescription._id}, {$set: {status: "filled"}})
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
                <div id="username" className="user name for prescription"> User Name</div>
                <div id="rxInfo" className="prescription-middle-info">
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Name:   </span>
                        {this.props.prescription.name}
                    </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Strength:   </span>
                        {this.props.prescription.strength}
                    </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Dose:   </span>
                        {this.props.prescription.dose} </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Date:   </span>
                        {this.props.prescription.date.toLocaleDateString("en-US")} </div>
                    <div className="prescription-item">
                        <span id="itemName" className="prescription-item-tag"> Status:   </span>
                        {this.props.prescription.status} </div>
                </div>
                {fillingButton}
            </div>
        );
    }
}
