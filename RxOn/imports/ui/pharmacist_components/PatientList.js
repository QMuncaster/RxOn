import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import IndividualPatient from './IndividualPatient';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

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

class PatientList extends Component {

    constructor(props) {
        super(props);
    }

    renderPatients() {
        return this.props.users.map((user) => {
            //only show users who are patients, not pharamcies
            // (THIS IS ALSO ENSURED ON SERVER SIDE)
            if (user.roles != 'admin') {
                return <IndividualPatient key={user._id} user={user} />
            }
        }
        );
    }

    render() {
        const { classes } = this.props;
        return (

            <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
                <ul>
                    <Typography variant="h5">
                        Patient List
                </Typography>
                    <Paper className={classes.root}>
                        <Table className={classes.table} style={{ tableLayout: "auto" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ width: "25%" }}>Patient
                                                    Name</TableCell>
                                    <TableCell align="center">Age</TableCell>
                                    <TableCell align="center">Gender</TableCell>
                                    <TableCell align="center">History</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderPatients()}
                            </TableBody>
                        </Table>
                    </Paper>
                </ul>
            </div>

        );
    }
}


const styledComponent = withStyles(styles)(PatientList);
export default withTracker(() => {
    Meteor.subscribe('userList');

    return {
        users: Meteor.users.find({}, {
            sort: { lastname: 1 }
        }).fetch()
    };
})(styledComponent);
