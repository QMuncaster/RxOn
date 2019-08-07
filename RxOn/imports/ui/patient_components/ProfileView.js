import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  

class ProfileView extends React.Component {

    handleEditButtonClick = () => {
        // this.setState({ [name]: event.target.value });
      };    

    render() {
        const { classes } = this.props;

        return (
            <form noValidate autoComplete="off">
                <div >
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        // '' is a hack to avoid uncontrolled component warning
                        value={this.props.firstName || ''}
                        className={classes.textField}
                        margin="normal"
                        disabled={true}
                    />

                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        value={this.props.lastName || ''}
                        className={classes.textField}
                        margin="normal"
                        disabled={true}
                    />

                    <TextField
                        required
                        id="sex"
                        label="Sex"
                        value={this.props.sex || ''}
                        className={classes.textField}
                        margin="normal"
                        disabled={true}
                    />

                    <TextField
                        required
                        id="address"
                        label="Address"
                        value={this.props.address || ''}
                        className={classes.textField}
                        margin="normal"
                        disabled={true}
                    />
                </div>

                <div>
                    <br />
                    <Button variant="contained" color="primary" onClick={this.handleEditButtonClick}>
                        Edit
                    </Button>
                </div>
            </form>
        );
    }
}


export default withStyles(styles)(withTracker(() => {
    let currentUser = Meteor.user();

    return {
      // can't do below in the render fn, as then gives uncontrolled action in controlled component warning...
      firstName: currentUser? Meteor.user().firstname : '' ,
      lastName: currentUser? Meteor.user().lastname : '' ,
      sex: currentUser? Meteor.user().sex : '' ,
      address: currentUser? Meteor.user().address : '' ,
    };
  })(ProfileView));
  