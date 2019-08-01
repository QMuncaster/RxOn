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
        sex: '',
        email: '',
        password: '',  // don't know if this is good practice
    };

    handleChange = (name) => event => {
        this.setState({ [name]: event.target.value });
    };

    validateFields = () => {
        if (!this.state.firstName) {
            this.setState({ firstNameError: true, firstNameErrorText: "Field is required." });
        } 
        
        if (!this.state.email || !this.state.password || !this.state.firstName || !this.state.lastName || !this.state.sex) {
            throw Error;
        }
    }

    handleSubmit = async (values) => {
        this.validateFields();
        try {
            console.log(this.state);
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
            alert(error);
            // document.getElementById("submit_btn").disabled = false;
            // console.log(error);
            // throw new SubmissionError({
            //     password: error
            // });
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
                        error={this.state.firstNameError}
                        helperText={this.state.firstNameErrorText}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        className={classes.textField}
                        margin="normal"
                    />

                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        value={this.state.lastName}
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
                        onChange={this.handleChange('email', '')}
                        className={classes.textField}
                        helperText="This will be your login username"
                        margin="normal"
                    />

                    <TextField
                        required
                        id="standard-password-input"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password', '')}
                        className={classes.textField}
                        type="password"
                        margin="normal"
                    />
                </div>


                    <Typography component="div">
                        Fields marked with * are required.
                    </Typography>

                <div>
                    <br />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
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