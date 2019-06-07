import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Prescriptions } from '../api/prescriptions.js';
import PatientPrescription from './PatientPrescription.js';
import "./styling/PatientPage.css"
import "./styling/PatientPrescription.css"

// Patient Page component - represents the patient page???
// Not sure how to structure this, just wanted to separate this from the App component...
class PatientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addingPrescription: false,
    };
  }

  openAddPrescriptionBox() {
    this.setState({ addingPrescription: true });
  }

  closeAddBox() {
    this.setState({ addingPrescription: false });
  }

  submitPrescription(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const strength = ReactDOM.findDOMNode(this.refs.strength).value.trim();
    const dose = ReactDOM.findDOMNode(this.refs.dose).value.trim();
    if (dose == '' || strength == '' || name == '') {
      alert("All fields are required.");
      return;
    }

    Prescriptions.insert({
      name,
      strength,
      dose,
      date: new Date(),
      status: "pending"
    });

    // Clear form inputs
    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.strength).value = '';
    ReactDOM.findDOMNode(this.refs.dose).value = '';

    this.closeAddBox();
  }

  renderAddPrescriptionBox() {
    if (this.state.addingPrescription === true) {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <form className="new-prescription" onSubmit={this.submitPrescription.bind(this)} >
              <label>Prescription name: </label>
              <input type="text" ref="name" placeholder="Enter name" />
              <br></br>

              <label>Prescription strength: </label>
              <input type="text" ref="strength" placeholder="Enter strength" />
              <br></br>

              <label>Prescription dose: </label>
              <input type="text" ref="dose" placeholder="Enter dose" />
              <br></br>

              <button className="button" type="submit">Submit</button>
              <button className="button" onClick={this.closeAddBox.bind(this)}>Cancel</button>
            </form>

          </div>
        </div>
      );
    }
    return null;
  }

  renderPrescriptions() {
    return this.props.prescriptions.map((px) => (
      <PatientPrescription key={px._id} prescription={px} />
    ));
  }

  render() {
    return (
      <div>
      <div className="container">
        {/* // header could be its own component, with added navbar */}
        <header>      
          <h1>Patient Portal</h1>
        </header>

        

        {/* // addPrescriptionBox should be its own component
        // but then we would need redux to share state (on whether the popup is open or closed)
        // since its a pain to share state through react 
        // TODO: make own component, use redux to track whether its open or not*/}
        {this.renderAddPrescriptionBox()}

        <table className="table">
          <thead className="th">
            <tr>
              <th className="th">Prescription</th>
              <th className="th">Strength</th>
              <th className="th">Dose</th>
              <th className="th">Request Date</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPrescriptions()}
          </tbody>
        </table>
      </div>
      <div className="button-container">
      <button className="button2" onClick={this.openAddPrescriptionBox.bind(this)}>
        Add Prescription
      </button>
      </div>
      </div>
     
    );
  }
}

export default withTracker(() => {
  return {
    prescriptions: Prescriptions.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(PatientPage);


// checkboxes if we want them:
// https://codepen.io/aaronschwartz/pen/WOOPRw
// probably only appropriate for the pharmacist portal though