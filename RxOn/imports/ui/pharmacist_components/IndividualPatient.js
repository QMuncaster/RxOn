import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Prescriptions} from "../../collections/prescriptions";
import ViewMedicationsDialog from "./ViewMedications";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Patient Name</TableCell>
                            {/*<TableCell align="right">Name</TableCell>*/}
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">History</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            {/*<TableCell component="th" scope="row">*/}
                            {/*    {row.name}*/}
                            {/*</TableCell>*/}
                            <TableCell align="center">{this.props.user.lastname} {this.props.user.firstname}</TableCell>
                            <TableCell align="center">{this.props.user.age} </TableCell>
                            <TableCell align="center">{this.props.user.sex}</TableCell>
                            <TableCell align="center"><ViewMedicationsDialog prescriptions={this.props.prescriptions}/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
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
