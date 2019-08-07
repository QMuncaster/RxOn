import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const sexes = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }];

class PatientProfile extends React.Component {

  state = {
    firstName: '',
    firstNameError: false,
    firstNameErrorText: '',

    lastName: '',
    lastNameError: false,
    lastNameErrorText: '',

    sex: '',
    sexError: false,
    sexErrorText: '',

    address: '',
    addressError: false,
    addressErrorText: '',

    isDisabled: true
  };

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.value });
  };

  validateReqFields = (fields) => {
    let invalid = false;
    for (let f of fields) {
      if (!f.value) {
        this.setState({ [f.error]: true, [f.text]: "Field is required." });
        invalid = true;
      }
      else {
        this.setState({ [f.error]: false });
      }
    }
    if (invalid) throw new Error();
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
          <Typography variant="h3" gutterBottom>
            Profile
          </Typography>

          <form noValidate autoComplete="off">
            <div >
              <TextField
                required
                id="firstName"
                label="First Name"
                value={this.state.firstName}
                error={this.state.firstNameError}
                helperText={this.state.firstNameErrorText}
                onChange={this.handleChange('firstName')}
                className={classes.textField}
                margin="normal"
                disabled={this.state.isDisabled}
              />

              <TextField
                required
                id="lastName"
                label="Last Name"
                value={this.state.lastName}
                error={this.state.lastNameError}
                helperText={this.state.lastNameErrorText}
                onChange={this.handleChange('lastName')}
                className={classes.textField}
                margin="normal"
                disabled={this.state.isDisabled}
              />

              <TextField
                required
                id="standard-select-sex"
                select
                label="Sex"
                className={classes.textField}
                value={this.state.sex}
                error={this.state.sexError}
                helperText={this.state.sexErrorText}
                onChange={this.handleChange('sex', '')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                disabled={this.state.isDisabled}
              >
                {sexes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                id="address"
                label="Address"
                value={this.state.address}
                error={this.state.addressError}
                helperText={this.state.addressErrorText}
                onChange={this.handleChange('address')}
                className={classes.textField}
                margin="normal"
                disabled={this.state.isDisabled}
              />
            </div>

            <div>
              <br />
              <Button variant="contained" color="default" onClick={this.handleReturn}>
                Cancel
            </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user()
  };
})(PatientProfile));
