import React, {Component} from 'react';


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
