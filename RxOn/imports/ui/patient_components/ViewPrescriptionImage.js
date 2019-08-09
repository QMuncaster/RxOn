import React, { useState } from 'react';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ModalImage from 'react-modal-image';

export default function ViewPrescriptionImage(props) {
    const { rxName, imgLink } = props.ContainerProps;
    console.log('view image comtaiomer proes: ', props.ContainerProps);

    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css')
        );
    }, []);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <IconButton
                className={clsx('fas fa-file-prescription')}
                color="default"
                onClick={handleClickOpen}
                disabled={imgLink === undefined || imgLink === '' ? true : false}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="cancel-dialog-title"
                maxWidth="xs"
            >
                <DialogTitle id="cancel-dialog-title">
                    Uploaded Prescription Image
                </DialogTitle>
                <DialogContent>
                    <ModalImage
                        small={imgLink}
                        large={imgLink}
                        hideDownload={false}
                        hideZoom={true}
                        alt={rxName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
