import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Prescriptions} from "../../collections/prescriptions";
import ViewMedicationsDialog from "./ViewMedications";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(2),
    },
    inline: {
        display: 'inline',
    },
});

class IndividualPatient extends Component {

    render() {


        return (

            <TableRow>
                <TableCell align="left"
                           style={{width: "25%"}}>{this.props.user.lastname} {this.props.user.firstname}</TableCell>
                <TableCell align="center">{this.props.user.age} </TableCell>
                <TableCell align="center">{this.props.user.sex}</TableCell>
                <TableCell align="center"><ViewMedicationsDialog prescriptions={this.props.prescriptions}/></TableCell>
            </TableRow>

        );
    }
}

const styledComponent = withStyles(styles)(IndividualPatient);
// pass in props, props is passed from parent automatically so that we can filter prescriptions by user._id
export default withTracker(props => {
    Meteor.subscribe('prescriptions.all');
    return {
        prescriptions: Prescriptions.find({"patientId":props.user._id}).fetch(),
    };
})(styledComponent);
