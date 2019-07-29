import React, {Component} from 'react';
import "../styling/PharmacyPrescription";
import Medication from "../patient_components/Medication";
import {withStyles} from "@material-ui/core";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Prescriptions} from "../../collections/prescriptions";
import ViewMedicationsDialog from "./ViewMedications";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import styles from "../patient_components/MedicationsPage";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,
    },
    inline: {
        display: 'inline',
    },
});

class IndividualPatient extends Component {

    render() {

        return (
            <div id="rxForm" className="admin-prescription-form ">
                    <List>
                        <ListItem>
                            <ListItemText>
                                {this.props.user.lastname} {this.props.user.firstname}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <ViewMedicationsDialog prescriptions={this.props.prescriptions}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
            </div>
        );
    }
}

const styledComponent = withStyles(styles)(IndividualPatient);
// pass in props, props is passed from parent automatically so that we can filter prescriptions by user._id
export default withTracker(props => {
    Meteor.subscribe('prescriptions');
    // console.log(props);
    return {
        prescriptions: Prescriptions.find({"patientId" : props.user._id}).fetch(),
    };
})(styledComponent);
