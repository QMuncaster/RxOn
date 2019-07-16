import React, {Component} from 'react';
import "../styling/PharmacyPrescription";


export default class IndividualPatient extends Component {

    render() {

        return (
            <div id="rxForm" className="admin-prescription-form ">
    
                    <ul> 
                        <li className="listItem"> {this.props.user.email}  </li> 
                        <li className="listItem"> {this.props.user.lastname}, {this.props.user.firstname}  </li>     
                    </ul>
            
            </div>
        );
    }
}