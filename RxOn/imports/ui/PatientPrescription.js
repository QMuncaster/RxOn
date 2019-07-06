import React, { Component } from 'react';
import { Prescriptions } from '../collections/prescriptions.js';
import "./styling/PatientPrescription"

export default class PatientPrescription extends Component {

  cancelPrescription() {
    Prescriptions.remove(this.props.prescription._id);
  }

  // editPrescription() {

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
          {/* TODO: add functionality so canceling can only be done for pending prescriptions */}
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
