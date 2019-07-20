import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import "../styling/PatientPrescription.css"


export default class PatientPrescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingPrescription: false,
            rxName:this.props.prescription.rxName,
            rxStrength:this.props.prescription.rxStrength,
            rxDose:this.props.prescription.rxDose
        };
    }

    cancelPrescription() {
        Meteor.call('prescriptions.remove', this.props.prescription._id);
    }


    openEditPrescriptionBox() {
        this.setState({addingPrescription: true});
    }

    closeAddBox() {
        this.setState({addingPrescription: false});
    }

    submitPrescription(event) {


        // event.preventDefault();
        // Find the text field via the React ref
        // const name = ReactDOM.findDOMNode(this.ref.name).value.trim();
        // const strength = ReactDOM.findDOMNode(this.ref.strength).value.trim();
        // const dose = ReactDOM.findDOMNode(this.ref.dose).value.trim();
        const name = this.state.rxName;
        const strength = this.state.rxStrength;
        const dose = this.state.rxDose;

        console.log( {name,strength,dose});

        if (dose === '' || strength ==='' || name === '') {
            alert("All fields are required.");
            return;
        }

        Meteor.call('prescriptions.edit',this.props.prescription._id, name, strength, dose);

        // Clear form inputs
        // ReactDOM.findDOMNode(this.ref.name).value = '';
        // ReactDOM.findDOMNode(this.ref.strength).value = '';
        // ReactDOM.findDOMNode(this.ref.dose).value = '';

        // this.setState({
        //     rxName:'',
        //     rxStrength:'',
        //     rxDose:''
        // });

        this.closeAddBox();
    }

    updateInputrxName(value) {
        this.setState(
            { rxName: value } );
    }

    updateInputrxStrength(value) {
        this.setState(
            { rxStrength: value } );
    }

    updateInputrxDose(value){
    this.setState(
        { rxDose: value } );
    }

    renderEditPrescriptionBox() {
        if (this.state.addingPrescription === true) {
            return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <form className="new-prescription" onSubmit={() => this.submitPrescription()}>
                            <label>Prescription name: </label>
                            <input type="text" ref="name" value={this.state.rxName} onChange={(event) =>this.updateInputrxName(event.target.value)}/>
                            <br></br>

                            <label>Prescription strength: </label>
                            <input type="text" ref="strength" value={this.state.rxStrength} onChange={(event) =>this.updateInputrxStrength(event.target.value)}/>
                            <br></br>

                            <label>Prescription dose: </label>
                            <input type="text" ref="dose" value={this.state.rxDose} onChange={(event) =>this.updateInputrxDose(event.target.value)}/>
                            <br></br>

                            <button className="button" type="submit" onClick={()=> this.submitPrescription()}>Submit</button>
                            <button className="button" onClick={() => this.closeAddBox()}>Cancel</button>
                        </form>

                    </div>
                </div>
            );
        }
        return null;
    }

    render() {
        return (

                    <tr className="tr">
                        <td className="th">{this.props.prescription.rxName }</td>
                        <td className="th">{this.props.prescription.rxStrength}</td>
                        <td className="th">{this.props.prescription.rxDose}</td>
                        <td className="th">{this.props.prescription.createdAt ? this.props.prescription.createdAt.toDateString() : ''}</td>
                        <td className="th">{this.props.prescription.status}</td>
                        <td className="prescription-edit-bt">
                            <button className="delete" onClick={() => this.cancelPrescription()}>
                                Cancel
                            </button>

                            <button className="edit" onClick={() => this.openEditPrescriptionBox()}>
                                Edit
                            </button>
                        </td>
                        {this.renderEditPrescriptionBox()}
                    </tr>

        );
    }
}
