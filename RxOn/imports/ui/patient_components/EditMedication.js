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

export default function EditAction(props) {
    const { _id, rxName, rxStrength, rxDose, refill, status } = props.ContainerProps;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        rxName: rxName,
        rxStrength: rxStrength,
        rxDose: rxDose,
        refill: refill,
    });

    const handleChange = valName => event => {
        let val = event.target.value;
        if (event.target.type === 'number') {
            val = parseInt(val, 10);
        }
        setValues({ ...values, [valName]: val });
    };

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setValues({
            rxName: rxName,
            rxStrength: rxStrength,
            rxDose: rxDose,
            refill: refill,
        });
        setOpen(false);
    }

    function handleSave() {
        Meteor.call('prescriptions.edit', _id, rxName, rxStrength, rxDose, refill);
        setOpen(false);
    }

    return (
        <React.Fragment>
            <IconButton
                variant="outlined"
                color="default"
                onClick={handleClickOpen}
                disabled={status === 'pending' ? false : true}
            >
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-dialog-title"
                maxWidth="xs"
            >
                <DialogTitle id="edit-dialog-title">
                    Edit Medication Information
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter new information below then click save.
                    </DialogContentText>
                    <br />
                    <DialogContentText>
                        You will be able to edit the medication's information until it has
                        been filled
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
                        margin="dense"
                        label="Medication Dose"
                        type="text"
                        value={values.rxDose}
                        multiline={true}
                        fullWidth={true}
                        onChange={handleChange('rxDose')}
                    />
                    <br />
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
