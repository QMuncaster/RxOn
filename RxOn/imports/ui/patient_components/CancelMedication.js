import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

export default function CancelAction(props) {
    const { _id, rxName, status } = props.ContainerProps;
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleCancel() {
        Meteor.call('prescriptions.remove', _id);
        setOpen(false);
    }

    return (
        <React.Fragment>
            <IconButton
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
                disabled={status === 'pending' ? false : true}
            >
                <CancelIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="cancel-dialog-title"
                maxWidth="xs"
            >
                <DialogTitle id="cancel-dialog-title">
                    Cancel Medication Dispensing Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure that you want to cancel your {rxName} medication?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleCancel} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
