import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import "../styling/PharmacyPrescription";
import PharmacySidebar from "./PharmacySidebar";
import {Prescriptions} from '../../collections/prescriptions';
import PrescriptionForPharmacy from './PrescriptionForPharmacy';

class PatientList extends Component {

    // cond: id matches, the the status will be set to "filled"
    //mangoDB update record; uses model to update

    fillPrescription() {
        Meteor.call('prescriptions.fill', this.props.prescription._id);
    }

    renderPrescriptions(status) {
        return this.props.prescriptions.map((px) => {
                if (px.status === status) {
                    return (<PrescriptionForPharmacy key={px._id} prescription={px}/>)
                }
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
                            {this.renderPrescriptions("pending")}
                            </div>
                        </div>
                      
                    </div>
                </div>
            );
        }


        // return (
        //     <div id="rxForm" className="admin-prescription-form ">
        //         <div id="username" className="user name for prescription"> User Name</div>
        //         <div id="rxInfo" className="prescription-middle-info">
        //             <div className="prescription-item">
        //                 <span id="itemName" className="prescription-item-tag"> Name:   </span>
        //                 {this.props.prescription.rxName}
        //             </div>
        //             <div className="prescription-item">
        //                 <span id="itemName" className="prescription-item-tag"> Strength:   </span>
        //                 {this.props.prescription.rxStrength}
        //             </div>
        //             <div className="prescription-item">
        //                 <span id="itemName" className="prescription-item-tag"> Dose:   </span>
        //                 {this.props.prescription.rxDose} </div>
        //             <div className="prescription-item">
        //                 <span id="itemName" className="prescription-item-tag"> Date:   </span>
        //                 {this.props.prescription.createdAt.toString("en-US")} </div>
        //             <div className="prescription-item">
        //                 <span id="itemName" className="prescription-item-tag"> Status:   </span>
        //                 {this.props.prescription.status} </div>
        //         </div>
        //         {fillingButton}
        //     </div>
        // );
    }

//find out the prescription collection
export default withTracker(() => {
    Meteor.subscribe('prescriptions.all');
    return {
        prescriptions: Prescriptions.find({}, {sort: {createdAt: -1}}).fetch(),
    };
})(PatientList);

