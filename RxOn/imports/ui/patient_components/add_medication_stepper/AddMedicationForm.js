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
import AddMedicationStepper from './AddMedicationStepper.js';

export default function AddAction() {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <IconButton edge="end" variant="outlined" onClick={handleClickOpen}>
                <AddIcon fontSize="large" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-dialog-title"
                maxWidth="sm"
            >
                <DialogTitle id="edit-dialog-title">Add New Medication</DialogTitle>
                <DialogContent>
                    <AddMedicationStepper />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
