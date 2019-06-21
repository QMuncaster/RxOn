import React, {Component} from 'react';
import PatientPrescription from "./PatientPrescription";


export default class PharmacySidebar extends Component {

    updatePharmacyProfile() {
        //TODO
        // Patients.update({
        //     Company Info,
        //     userType,
        //     UserID,
        //     date: new Date(),
        // });
    }

    renderPrescriptions() {
        return this.props.prescriptions.map((px) => (
            <PatientPrescription key={px._id} prescription={px} />
        ));
    }

    render() {
        return (
            <div className="pharmacy sidebar">
                <div className="info-section">
                        <div className="gender-section">
                            <label className="Company Name">Company Name</label>
                            <input type="text" />
                            <label className="Company Address">Company Address</label>
                            <input type="text" />
                            <label className="Company contact">Company Contact</label>
                            <input type="text" />
                        </div>
                        <div className="setting">
                            <button className={"ui button setting"} onClick={()=>{this.updatePharmacyProfile.bind(this)}}>Settings</button>
                        </div>
                    </div>
                </div>
        );

    }
}

//get prescription from data base

const mapStateToProps = (state) => {
    return {
        prescriptions: state.prescriptions

    };

};


export default connect(mapStateToProps)(MessageList);
