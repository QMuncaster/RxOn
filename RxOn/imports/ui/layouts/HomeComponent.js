import MedicationsPage from '../patient_components/MedicationsPage';
import PrescriptionTable from '../pharmacist_components/PrescriptionTable';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (Roles.userIsInRole(this.props.user, 'admin')) return <PrescriptionTable />;
        else if (Roles.userIsInRole(this.props.user, 'patient')) return <MedicationsPage />;
        else return null; // necessary so don't show patient page while waiting for user and role of an admin
    }
}

// const styledComponent = withStyles()(HomeComponent);
export default withTracker(() => {
    return {
        user: Meteor.user()
    };
})(HomeComponent);

