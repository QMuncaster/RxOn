import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import { Prescriptions } from '../../collections/prescriptions';
import MUIDataTable from 'mui-datatables';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

function Progress() {
    return <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />;
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
            return retVal;
        });
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
            {
                name: '_id',
                options: {
                    display: 'excluded',
                    filter: false,
                },
            },
            
            {name: 'Refills Remaining'},


            {
                name: '',
                options: {
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let _id;
                        if (tableMeta.rowData !== undefined) {
                            _id = tableMeta.rowData[4];
                        }
                        
                        return (
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => {

                                    Meteor.call('prescriptions.refill', _id);
                                }}
                            >
                                Refill
                            </Button>
                        );
                    },
                },
            },

            
            {
                name: '',
                options: {
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let _id;
                        if (tableMeta.rowData !== undefined) {
                            _id = tableMeta.rowData[4];
                        }
                        return (
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    Meteor.call('prescriptions.fill', _id);
                                }}
                            >
                                Fill
                            </Button>
                        );
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
                <Grid container spacing={32} alignItems="stretch">
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
