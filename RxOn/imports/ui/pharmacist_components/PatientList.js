import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import IndividualPatient from './IndividualPatient';
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

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

class PatientList extends Component {

    constructor(props) {
        super(props);
    }


    renderPatients() {
        return this.props.users.map((user) => {
            //only show users who are patients, not pharamcies
            if (user.roles != 'admin') {
                    return <IndividualPatient key={user._id} user={user} />
                }
            }
        );x
    }


    render() {
            return (
                <div className="pharmacy-profile-page-heading" >
                    <div className="pharmacy-profile-page">
                        <div  className="Pharmacy-Headings">
                            <Typography variant="h2" gutterBottom>
                                Patient List
                            </Typography>
                            <div id="pendingBox">
                                <ul>
                            {this.renderPatients()}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }


const styledComponent = withStyles(styles)(PatientList);
export default withTracker(() => {
    Meteor.subscribe('userList');

    return {
        users: Meteor.users.find({}, {
            sort: {lastname: 1}}).fetch()
    };
})(styledComponent);
