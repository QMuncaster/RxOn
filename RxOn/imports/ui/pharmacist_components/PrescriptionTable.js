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
      console.log(this.props.prescriptions);
      const columns = [
         { name: 'status' },
         { name: '_id' },
         {
            name: 'rxName',
            options: {
               filterType: 'textField',
            },
         },
         { name: 'rxStrength' },
      ];

      const options = {
         filterType: 'dropdown',
         responsive: 'scroll',
         sort: 'true',
      };

      return (
         <div style={{ padding: 20 }}>
            <br />
            <Grid container spacing={32}>
               <Grid item xs={12}>
                  <MUIDataTable
                     title={'Prescription List'}
                     data={this.props.prescriptions}
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
