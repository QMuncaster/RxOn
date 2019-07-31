
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';


class PatientProfile extends Component {
  
  render() {
//   const [values, setValues] = useState({
//     firstname: '',
//     lastname: ''
// });

//   const handleChange = valName => event => {
//     setValues({ ...values, [valName]: event.target.value });
//   };

//   function handleSave() {
//     // Meteor.call(
//     //     'Meteor.publish()',
//     //     currentUser.firstname,
//     //     currentUser.lastname,
//     // );
// }
  


  return (
    <React.Fragment>
      <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
      <Typography variant="h2" gutterBottom>
        Profile Page
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            name="firstname"
            label="First Name"
            fullWidth
            autoComplete="fname"
            //onChange={handleChange('firstname')}
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            autoComplete="lname"
            //onChange={handleChange('lastname')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          /> */}

        <div style={{ paddingTop: 20 }}>
          <Button color="primary">
            Update
          </Button>
          </div>

        </Grid>
      </Grid>
      </div>
    </React.Fragment>
  );
}
}

export default withTracker(() => {
     Meteor.subscribe('userData');

    return {
        currentUser: Meteor.user()
    };
})(PatientProfile);








// import React, {Component} from 'react';
// import  faker from 'faker';
// import { withTracker } from 'meteor/react-meteor-data';
// import "../styling/PatientProfile.css";

//  class PatientProfile extends Component {

//     updateProfile() {
//         // Patients.update({
//         //     userType,
//         //     UserID,
//         //     date: new Date(),
//         // });
//         //TODO: remember update patient's firstname and lastname in prescriptions as well
//     }


//     render() {
//         return (
//             <div className="profile-page">
//                 <h2>Your Profile</h2>
//                 <div className="names-section">
//                     <div className="image-section">
//                         <img  src={faker.image.avatar()} alt ="user selfie"/>
//                         {/*<a href="#">Change Image</a>*/}
//                     </div>
//                     <div className="name-section">
//                         <div className="gender-section">
//                             <label htmlFor="mr">Mr.</label>
//                             <input type="radio" id="mr" name="gender-radio-group" value="mr" defaultChecked />
//                             <label htmlFor="mrs">Mrs.</label>
//                             <input type="radio" id="mrs" name="gender-radio-group" value="mrs" />
//                             <label htmlFor="mx">Mx.</label>
//                             <input type="radio" id="mx" name="gender-radio-group" value="mx" />
//                         </div>

//                         <div className="firstname-section">
//                             <label>First Name:</label>
//                                 {this.props.currentUser ?
//                                     <input type="text" id="firstname" placeholder={this.props.currentUser.firstname}  />
//                                     :
//                                     <input type="text" id="firstname" placeholder="enter first name"/>
//                                 }
//                         </div>

//                         <div className="lastname-section">
//                             <label>Last Name:</label>
//                                 {this.props.currentUser ?
//                                     <input type="text" id="lastname" placeholder={this.props.currentUser.lastname}  />
//                                     :
//                                     <input type="text" id="lastname" placeholder="enter last name"/>
//                                 }
//                         </div>
//                     </div>
//                 </div>

//                 <div className="contact-section">
//                     <span>
//                         <label>Address:</label>
//                         <input type="text" id="address" />
//                     </span>

//                     <span>
//                         <label>City:</label>
//                         <input type="text" id="city" />

//                         <label>Country:</label>
//                         <input type="text" id="country" />
//                     </span>

//                     <span>
//                         <label>Phone Number:</label>
//                         <input type="text" id="phone-part1" />
//                         <input type="text" id="phone-part2" />
//                         <input type="text" id="phone-part3" />

//                         <label>Email:</label>
//                         <input type="email" id="email" />
//                     </span>
//                 </div>

//                 <div className="emergency-section">

//                 </div>

//                 <div className="action-buttons-section">
//                     <button className="ui button update-button" onClick={() => this.updateProfile()}> Update</button>
//                 </div>

//             </div>
//         );
//     }
// }

// export default withTracker(() => {
//     Meteor.subscribe('userData');

//     return {
//         currentUser: Meteor.user()
//     };
// })(PatientProfile);
