import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
                    <AddMedicationStepper handleClose={handleClose}/>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
