import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Prescriptions } from '../../collections/prescriptions.js';
import "../styling/PatientPrescription.css"

export default class PatientPrescription extends Component {

  cancelPrescription() {
    Meteor.call('prescriptions.remove', this.props.prescription._id);
  }

  // editPrescription() {
  // // Mandy will do this
  // }

  render() {
    return (
     <tr className="tr">
        <td className="th">{this.props.prescription.rxName}</td>
        <td className="th">{this.props.prescription.rxStrength}</td>
        <td className="th">{this.props.prescription.rxDose}</td>
        <td className="th">{this.props.prescription.createdAt? this.props.prescription.createdAt.toString() : ''}</td>
        <td className="th">{this.props.prescription.status}</td>
        <td className="delete">
          <button className="delete" onClick={this.cancelPrescription.bind(this)}>
            Cancel
          </button>
          <button className="edit">
            Edit
          </button>
        </td>
      </tr>

    );
  }
}
