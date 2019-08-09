import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Prescriptions } from '../../collections/prescriptions';
import MUIDataTable from 'mui-datatables';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import PrescriptionTableActions from './PrescriptionTableActions';

function Progress() {
    return (
        <CircularProgress
            size={24}
            style={{ marginLeft: 15, position: 'relative', top: 4 }}
        />
    );
}

class PrescriptionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.prescriptions !== prevProps.prescriptions) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isLoading } = this.state;
        const data = this.props.prescriptions.map(px => {
            let retVal = new Object();
            retVal['_id'] = px._id;
            retVal['Status'] = px.status;
            retVal['Name'] = px.rxName;
            retVal['Strength'] = px.rxStrength;
            retVal['Request Date'] = px.createdAt.toDateString();
            retVal['Refills Remaining'] = px.refill;
            retVal['Link'] = px.imgLink;
            return retVal;
        });
        const columns = [
            {
                name: '_id',
                options: {
                    display: 'excluded',
                    filter: false,
                },
            },
            { name: 'Status' },
            {
                name: 'Name',
                options: {
                    filterType: 'textField',
                },
            },
            { name: 'Strength' },
            { name: 'Request Date' },
            { name: 'Refills Remaining' },
            {
                name: 'Link',
                options: {
                    display: 'excluded',
                    filter: false,
                },
            },
            {
                name: 'Actions',
                options: {
                    sort: false,
                    empty: true,
                    searchable: false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let id,
                            status,
                            imgLink,
                            rxName = '';
                        let refill = 0;
                        if (tableMeta.rowData !== undefined) {
                            id = tableMeta.rowData[0];
                            status = tableMeta.rowData[1];
                            rxName = tableMeta.rowData[2];
                            refill = tableMeta.rowData[5];
                            imgLink = tableMeta.rowData[6];
                        }
                        let values = { id, status, rxName, refill, imgLink };
                        return <PrescriptionTableActions ContainerProps={values} />;
                    },
                },
            },
        ];

        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            sort: 'true',
        };

        return (
            <div style={{ padding: 20 }}>
                <br />
                <Grid container spacing={0} alignItems="stretch">
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={
                                <Typography variant="h5">
                                    Prescription List
                                    {isLoading && <Progress />}
                                </Typography>
                            }
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
