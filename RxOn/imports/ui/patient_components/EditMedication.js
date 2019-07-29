import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

export default function EditAction(props) {
    const { _id, rxName, rxStrength, rxDose, refill } = props.ContainerProps;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        rxName: rxName,
        rxStrength: rxStrength,
        rxDose: rxDose,
        refill: refill
    });

    const handleChange = valName => event => {
        setValues({ ...values, [valName]: event.target.value });
    };

    function handleClickOpen() {
        setOpen(true);
    }

    function toggleRefillTrue() {
        values.refill = true;
    }
    
    function toggleRefillFalse() {
          values.refill = false;
    }

    function handleClose() {
        setValues({ rxName: rxName, rxStrength: rxStrength, rxDose: rxDose, refill: refill });
        setOpen(false);
    }

    function handleSave() {
        Meteor.call('prescriptions.edit', _id, values.rxName, values.rxStrength, values.rxDose, values.refill);
        setOpen(false);
    }

    return (
        <React.Fragment>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="edit-dialog-title" maxWidth="xs">
                <DialogTitle id="edit-dialog-title">Edit Medication Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter new information below then click save.</DialogContentText>
                    <br />
                    <DialogContentText>
                        You will be able to edit the medication's information until it has been filled
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Medication Name"
                        type="text"
                        value={values.rxName}
                        multiline={true}
                        fullWidth={true}
                        onChange={handleChange('rxName')}
                    />
                    <br />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Medication Strength"
                        type="text"
                        value={values.rxStrength}
                        multiline={true}
                        fullWidth={true}
                        onChange={handleChange('rxStrength')}
                    />
                    <br />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Medication Dose"
                        type="text"
                        value={values.rxDose}
                        multiline={true}
                        fullWidth={true}
                        onChange={handleChange('rxDose')}
                    />
                     <br />

                    <Button  onClick={toggleRefillTrue} color="primary">
                    Yes, Refill
                   </Button>
                   <Button  onClick={toggleRefillFalse} color="primary">
                    No, Refill
                   </Button>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
