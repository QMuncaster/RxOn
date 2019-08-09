import React from 'react';
import { Meteor } from 'meteor/meteor';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ViewMedicationImage from '../patient_components/medication_list_components/ViewMedicationImage';

const options = ['Fill', 'Refill'];

export default function SplitButton(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const anchorRef = React.useRef(null);
    const { id, status, rxName, imgLink, refill } = props.ContainerProps;

    function handleClick() {
        switch (options[selectedIndex]) {
            case 'Fill':
                Meteor.call('prescriptions.fill', id);
                break;
            case 'Refill':
                Meteor.call('prescriptions.refill', id);
                break;
        }
    }

    function isDisabled(option) {
        switch (option) {
            case 'Fill':
                if (status === 'pending') {
                    return false;
                } else return true;
            case 'Refill':
                if ((status === 'filled' || status == 'refilled') && refill > 0) {
                    return false;
                } else return true;
            default:
                return false;
        }
    }

    function handleMenuItemClick(event, index) {
        setSelectedIndex(index);
        setOpen(false);
    }

    function handleToggle() {
        setOpen(prevOpen => !prevOpen);
    }

    function handleClose(event) {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    return (
        <Grid container>
            <Grid item align="center">
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    ref={anchorRef}
                    size="small"
                >
                    <Button
                        onClick={handleClick}
                        disabled={isDisabled(options[selectedIndex])}
                    >
                        {options[selectedIndex]}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <ViewMedicationImage ContainerProps={{ rxName, imgLink }} />
                <Popper open={open} anchorEl={anchorRef.current} transition>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom'
                                        ? 'center top'
                                        : 'center bottom',
                            }}
                        >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                disabled={isDisabled(option)}
                                                dense={true}
                                                onClick={event =>
                                                    handleMenuItemClick(event, index)
                                                }
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}
