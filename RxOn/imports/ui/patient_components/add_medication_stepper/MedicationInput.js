import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class MedicationInput extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const { values, handleChange } = this.props;
      return (
         <React.Fragment>
            <TextField
               autoFocus
               margin="dense"
               label="Medication Name"
               type="text"
               placeholder="Medication Name (e.g Asprin)"
               multiline={true}
               fullWidth={true}
               value={values.rxName}
               onChange={handleChange('rxName')}
               variant="outlined"
            />
            <br />
            <TextField
               autoFocus
               margin="dense"
               label="Medication Strength"
               type="text"
               placeholder="Medication Strength (e.g 100 mg)"
               multiline={true}
               fullWidth={true}
               onChange={handleChange('rxStrength')}
               variant="outlined"
            />
            <br />
            <TextField
               autoFocus
               margin="dense"
               label="Medication Dose"
               type="text"
               placeholder="Prescribed Dosage (e.g one tablet twice a day)"
               multiline={true}
               fullWidth={true}
               onChange={handleChange('rxDose')}
               variant="outlined"
            />
         </React.Fragment>
      );
   }
}
