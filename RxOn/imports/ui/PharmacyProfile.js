import React, {Component} from 'react';
import {Prescriptions} from '../api/prescriptions';
import PrescriptionForPharmacy from './PrescriptionForPharmacy';
import {withTracker} from 'meteor/react-meteor-data';

class PharmacytProfile extends Component {

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
            <div className="pharmacy-profile-page">
                <div className="Pharmacy-Headings">
                    <h2 className="prescription-header-individual"> Pending</h2>
                    <div>
                        {this.renderPrescriptions("pending")}
                    </div>
                </div>
                <div className="Pharmacy-Headings">
                    <h2 className="prescription-header-individual"> Filled</h2>
                    <div>
                        {this.renderPrescriptions("filled")}
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        prescriptions: Prescriptions.find({}, {sort: {createdAt: -1}}).fetch(),
    };
})(PharmacytProfile);
