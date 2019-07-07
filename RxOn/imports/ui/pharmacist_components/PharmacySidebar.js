import React, {Component} from 'react';
import PatientPrescription from "../patient_components/PatientPrescription";


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
            <div className="pharmacy-sidebar">
                <div className="info-section">
                        <div className="gender-section">
                            <label  className="company-info">Company Name: XXX</label>
                            {/*<input type="text" />*/}
                            <label className="company-info">Company Address:XXX</label>
                            {/*<input type="text" />*/}
                            <label className="company-info">Company Contact:XXX</label>
                            {/*<input type="text" />*/}
                        </div>
                        <div className="setting">
                            <button className="ui-button-setting" onClick={()=>{this.updatePharmacyProfile.bind(this)}}>Settings</button>
                        </div>
                    </div>
                </div>
        );

    }
}

//TODO:Progress-4
// get prescription from data base
//
// const mapStateToProps = (state) => {
//     return {
//         prescriptions: state.prescriptions
//
//     };
//
// };

//TODO: Progress-4
// export default connect(mapStateToProps)(MessageList);
