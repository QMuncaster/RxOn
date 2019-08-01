import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import pify from 'pify';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
    },
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

class TextFields extends React.Component {

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

        email: '',
        emailError: false,
        emailErrorText: '',

        password: '', // don't know if this is good practice
        passwordError: false,
        passwordErrorText: ''
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

    handleSubmit = async (values) => {
        document.getElementById("submit_btn").disabled = true;
        try {
            this.validateReqFields(
                [
                    { value: this.state.firstName, error: 'firstNameError', text: 'firstNameErrorText' },
                    { value: this.state.lastName, error: 'lastNameError', text: 'lastNameErrorText' },
                    { value: this.state.sex, error: 'sexError', text: 'sexErrorText' },
                    { value: this.state.email, error: 'emailError', text: 'emailErrorText' },
                    { value: this.state.password, error: 'passwordError', text: 'passwordErrorText' },
                ]
            );

            await pify(Accounts.createUser)({
                email: this.state.email,
                password: this.state.password,
                profile: {
                    firstname: this.state.firstName,
                    lastname: this.state.lastName,
                    address: this.state.sex,
                }
            });
            this.props.history.push('/home');
        } catch (error) {
            document.getElementById("submit_btn").disabled = false;
            this.setState({ errorMessage: error.reason? "Error: " + error.reason : ''});
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div>
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
                    >
                        {sexes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        required
                        id="email"
                        label="Email"
                        value={this.state.email}
                        error={this.state.emailError}
                        helperText={this.state.emailErrorText}
                        onChange={this.handleChange('email', '')}
                        className={classes.textField}
                        margin="normal"
                    />

                    <TextField
                        required
                        id="standard-password-input"
                        label="Password"
                        value={this.state.password}
                        error={this.state.passwordError}
                        helperText={this.state.passwordErrorText}
                        onChange={this.handleChange('password', '')}
                        className={classes.textField}
                        type="password"
                        margin="normal"
                    />
                </div>

                <Typography component="div" color='error'>
                    <br />
                    {this.state.errorMessage}
                </Typography>

                <div>
                    <br />
                    <Button variant="contained" id="submit_btn" color="primary" className={classes.button} onClick={this.handleSubmit}>
                        Signup
                    </Button>
                </div>
            </form>

        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);