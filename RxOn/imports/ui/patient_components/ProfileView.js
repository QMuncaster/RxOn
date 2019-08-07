import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import pify from 'pify';

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

class ProfileView extends React.Component {
    state = {
        fieldsDisabled: true,
        isSubmitDisabled: false,

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
    }

    handleButtonClick = () => {
        if (this.state.fieldsDisabled) {
            this.setState({ firstName: this.props.firstName })
            this.setState({ lastName: this.props.lastName })
            this.setState({ sex: this.props.sex })
            this.setState({ address: this.props.address })
            this.setState({ fieldsDisabled: false });
        } else {
            this.handleSubmit();
        }
    };

    handleChange = (name) => event => {
        this.setState({ [name]: event.target.value });
    };

    // function returns either the Meteor user info if not editing
    // or the text from the state when editing
    getValue = (field) => {
        if (!this.state.fieldsDisabled) {
            return this.state[field];
        }
        // '' is a hack to avoid warning:
        // A component is changing a controlled input of type text to be uncontrolled.
        return this.props[field] || '';
    }

    // bad code duplication of SignupForm.js
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
        return true;
    }
    
    handleSubmit = async () => {
        this.setState({ isSubmitDisabled: true });
        try {
            this.validateReqFields(
                [
                    { value: this.state.firstName, error: 'firstNameError', text: 'firstNameErrorText' },
                    { value: this.state.lastName, error: 'lastNameError', text: 'lastNameErrorText' },
                    { value: this.state.sex, error: 'sexError', text: 'sexErrorText' },
                    { value: this.state.address, error: 'addressError', text: 'addressErrorText' },
                ]
            );
            await pify(Meteor.call)(
                'account.edit', this.state.firstName, this.state.lastName, this.state.sex, this.state.address
            );
            this.setState({ fieldsDisabled: true });
        } catch (error) {
            this.setState({ isSubmitDisabled: false, errorMessage: error.reason });
        }
    };

    handleCancel = () => {
        this.setState({
            fieldsDisabled: true,

            firstNameError: false,
            firstNameErrorText: '',
    
            lastNameError: false,
            lastNameErrorText: '',
    
            sexError: false,
            sexErrorText: '',
    
            addressError: false,
            addressErrorText: '',
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <form noValidate autoComplete="off">
                <div >
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        value={this.getValue('firstName')}
                        onChange={this.handleChange('firstName')}
                        error={this.state.firstNameError}
                        helperText={this.state.firstNameErrorText}
                        className={classes.textField}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    />

                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        value={this.getValue('lastName')}
                        onChange={this.handleChange('lastName')}
                        error={this.state.lastNameError}
                        helperText={this.state.lastNameErrorText}
                        className={classes.textField}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    />

                    <TextField
                        required
                        id="standard-select-sex"
                        select
                        label="Sex"
                        className={classes.textField}
                        value={this.getValue('sex')}
                        onChange={this.handleChange('sex')}
                        error={this.state.sexError}
                        helperText={this.state.sexErrorText}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
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
                        value={this.getValue('address')}
                        onChange={this.handleChange('address')}
                        error={this.state.addressError}
                        helperText={this.state.addressErrorText}
                        className={classes.textField}
                        margin="normal"
                        disabled={this.state.fieldsDisabled}
                    />
                </div>

                <Typography component="div" color='error'>
                    <br />
                    {this.state.errorMessage}
                </Typography>

                <div>
                    <br />
                    {/* edit or submit button */}
                    <Button variant="contained" color="primary" onClick={this.handleButtonClick} disabled={this.isSubmitDisabled}>
                        {this.state.fieldsDisabled ? "Edit" : "Submit"}
                    </Button>

                    {/* cancel button, only visible when above button is "Submit" */}
                    {this.state.fieldsDisabled ?
                        '' :
                        <Button variant="contained" color="default" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    }
                </div>
            </form>
        );
    }
}


export default withStyles(styles)(withTracker(() => {
    let currentUser = Meteor.user();

    return {
        // can't do below in the render fn, as then gives uncontrolled action in controlled component warning...
        firstName: currentUser ? Meteor.user().firstname : '',
        lastName: currentUser ? Meteor.user().lastname : '',
        sex: currentUser ? Meteor.user().sex : '',
        address: currentUser ? Meteor.user().address : '',
    };
})(ProfileView));
