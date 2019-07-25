import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

export default function AddAction() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        rxName: '',
        rxStrength: '',
        rxDose: '', 
        refill: false
    });

    const handleChange = valName => event => {
        setValues({ ...values, [valName]: event.target.value });
    };

    function toggleRefill() {
        values.refill = true;
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        //setValues({ rxName: rxName, rxStrength: rxStrength, rxDose: rxDose });
        setOpen(false);
    }

    function handleSave() {
        Meteor.call(
            'prescriptions.insert',
            values.rxName,
            values.rxStrength,
            values.rxDose,
            Meteor.user().firstname,
            Meteor.user().lastname,
            values.refill,
        );
        setOpen(false);
    }

    return (
        <React.Fragment>
            <IconButton edge="end" variant="outlined" onClick={handleClickOpen}>
                <AddIcon fontSize="large"/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-dialog-title" maxWidth="sm">
                <DialogTitle id="edit-dialog-title">Add New Medication</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter information of new medication that you wish to add then click Add.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Medication Name"
                        type="text"
                        placeholder="Medication Name (e.g Asprin)"
                        multiline={true}
                        fullWidth={true}
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
                    <br />
                   <Button  onClick={toggleRefill} color="primary">
                    Refill?
                   </Button>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
