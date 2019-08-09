import MedicationsPage from '../patient_components/MedicationsPage';
import PrescriptionTable from '../pharmacist_components/PrescriptionTable';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (Roles.userIsInRole(this.props.user, 'admin')) {
            return <PrescriptionTable />;
        } else if (Roles.userIsInRole(this.props.user, 'patient')) {
            return <MedicationsPage />;
        }
        // React conditionaly rendering must return null if not any of the cases above
        else return null;
    }
}

export default withTracker(() => {
    return {
        user: Meteor.user(),
    };
})(HomeComponent);
