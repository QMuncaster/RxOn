import React, {Component} from 'react';
import "../styling/PharmacyPrescription";


export default class IndividualPatient extends Component {

    // cond: id matches, the the status will be set to "filled"
    //mangoDB update record; uses model to update

   


    render() {

        return (
            <div id="rxForm" className="admin-prescription-form ">
                <div id="username" className="user name for prescription"> User Name</div>
                <div id="rxInfo" className="prescription-middle-info">
                    {/* <div className="prescription-item"> */}
                    
                    <ul>
                    {this.props.user ?
                            <li className="listItem"> First Name: {this.props.user.firstname}  </li> : ''}
                    {/* </div> */}
                    {/* <div className="prescription-item"> */}
                        {/* <span id="itemName" className="prescription-item-tag"> Strength:   </span>
                        {this.props.user.lastname} */}
                    {/* </div> */}

                    </ul>
                </div>
            </div>
        );
    }
}