import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import { Prescriptions } from '../../collections/prescriptions';
import MUIDataTable from 'mui-datatables';
import { Grid } from '@material-ui/core';

class PrescriptionTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const data = this.props.prescriptions.map(px => {
            let retVal = new Object();
            retVal['Status'] = px.status;
            retVal['Name'] = px.rxName;
            retVal['Strength'] = px.rxStrength;
            retVal['Request Date'] = px.createdAt.toDateString();
            return retVal;
        });
        console.log(this.props.prescriptions);
        const columns = [
            { name: 'Status' },
            { name: 'Request Date' },
            {
                name: 'Name',
                options: {
                    filterType: 'textField',
                },
            },
            { name: 'Strength' },
        ];

        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            sort: 'true',
        };

        return (
            <div style={{ padding: 20 }}>
                <br />
                <Grid container spacing={32} alignItems="stretch">
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={'Prescription List'}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('prescriptions.all');
    return {
        prescriptions: Prescriptions.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(PrescriptionTable);
