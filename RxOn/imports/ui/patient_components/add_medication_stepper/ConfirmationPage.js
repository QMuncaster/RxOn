import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

export default class ConfirmationPage extends Component {
   constructor(props) {
      super(props);
   }
   
   render() {
      const {
         values: { rxName, rxStrength, rxDose, imgLink },
      } = this.props;
      return (
         <React.Fragment>
            <List>
               <ListItemText primary="Medication Name" secondary={rxName} />
               <ListItemText primary="Medication Strength" secondary={rxStrength} />
               <ListItemText primary="Medication Dose" secondary={rxDose} />
               <Link href={imgLink} target="_blank" color="primary">
                  Uploaded Prescription
               </Link>
            </List>
         </React.Fragment>
      );
   }
}
