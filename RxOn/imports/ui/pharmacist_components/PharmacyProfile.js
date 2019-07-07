import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Prescriptions} from '../../collections/prescriptions';
import PrescriptionForPharmacy from './PrescriptionForPharmacy';
import PharmacySidebar from "./PharmacySidebar";
import '../styling/PharmacyPrescription.css';

class PharmacyProfile extends Component {

    renderPrescriptions(status) {
        return this.props.prescriptions.map((px) => {
                if (px.status === status) {
                    console.log(px);
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
                        <h2 id="pharmHeading" className="prescription-header-individual"> Pending</h2>
                        <div id="pendingBox">
                            {this.renderPrescriptions("pending")}
                        </div>
                    </div>
                    <div className="Pharmacy-Headings">
                        <h2 id="pharmHeading" className="prescription-header-individual"> Filled</h2>
                        <div id="filledBox">
                            {this.renderPrescriptions("filled")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//find out the prescription collection
export default withTracker(() => {
    Meteor.subscribe('prescriptions.all');
    return {
        prescriptions: Prescriptions.find({}, {sort: {createdAt: -1}}).fetch(),
    };
})(PharmacyProfile);

