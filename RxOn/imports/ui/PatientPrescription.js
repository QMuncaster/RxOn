import React, { Component } from 'react';
import { Prescriptions } from '../api/prescriptions.js';
import "./styling/PatientPrescription"

// Patient prescription component - represents a single row in prescription table
export default class PatientPrescription extends Component {

  cancelPrescription() {
    Prescriptions.remove(this.props.prescription._id);
  }

  render() {
    return (
     <tr className="tr">
        <td className="th">{this.props.prescription.name}</td>
        <td className="th">{this.props.prescription.strength}</td>
        <td className="th">{this.props.prescription.dose}</td>
        <td className="th">{this.props.prescription.date.toLocaleDateString("en-US")}</td>
        <td className="th">{this.props.prescription.status}</td>
        <td className="delete">
          {/* TODO: add functionality so canceling can only be done for pending prescriptions */}
          <button className="delete" onClick={this.cancelPrescription.bind(this)}>
            Cancel
          </button>
        </td>
      </tr>
     
    );
  }
}
