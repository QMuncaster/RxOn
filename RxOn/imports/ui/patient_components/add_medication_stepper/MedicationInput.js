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
                    margin="dense"
                    label="Medication Strength"
                    type="text"
                    placeholder="Medication Strength (e.g 100 mg)"
                    multiline={true}
                    fullWidth={true}
                    value={values.rxStrength}
                    onChange={handleChange('rxStrength')}
                    variant="outlined"
                />
                <br />
                <TextField
                    margin="dense"
                    label="Medication Dose"
                    type="text"
                    placeholder="Prescribed Dosage (e.g one tablet twice a day)"
                    multiline={true}
                    fullWidth={true}
                    value={values.rxDose}
                    onChange={handleChange('rxDose')}
                    variant="outlined"
                />
                <TextField
                    id="outlined-number"
                    label="Number of refills"
                    value={values.refill}
                    onChange={handleChange('refill')}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="dense"
                    variant="outlined"
                />
            </React.Fragment>
        );
    }
}
