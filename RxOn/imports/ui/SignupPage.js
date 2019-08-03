
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';


export default function AddPatient() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        address: '', 
       
    });

    const handleChange = valName => event => {
        setValues({ ...values, [valName]: event.target.value });
    };

   
    function handleSave() {
        Meteor.call(
            Accounts.createUser({
                email: email.value,
                password: password.value,
                profile: {
                    firstname: firstname.value,
                    lastname: lastname.value,
                    address: address.value,
                    //phonenumber: phonenumber.value,
                    //gender: gender.value,
                    //dateofbirth: dateofbirth.value,
                    //city: city.value,
                    //country: country.value
                }
            })
        );
    }

    
  return (
    <React.Fragment>
      <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
      <Typography variant="h2" gutterBottom>
        SignUp Page
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
            id="lastname"
            name="lastname"
            label="Last Name"
            fullWidth
            autoComplete="lastname"
            //onChange={handleChange('lastname')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
        <Button onClick={handleSave} color="primary">
                        Sign Up
         </Button>
          </div>

        </Grid>
      </Grid>
      </div>
    </React.Fragment>
  );
}
