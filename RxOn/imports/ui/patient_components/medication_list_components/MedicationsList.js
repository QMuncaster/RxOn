import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { Prescriptions } from '../../../collections/prescriptions.js';
import Medication from './Medication';
import AddMedicationDialog from '../add_medication_stepper/AddMedicationDialog';

const useStyles = makeStyles(theme => ({
    orangeIcon: {
        color: deepOrange[600],
        fontSize: 10,
    },
    purpleIcon: {
        color: deepPurple[500],
        fontSize: 10,
    },
    inline: {
        display: 'inline',
    },
    gridMargin: {
        marginRight: theme.spacing(3),
    },
}));

function Legend() {
    const classes = useStyles();
    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css')
        );
    }, []);
    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item>
                    <Icon className={clsx(classes.orangeIcon, 'fas fa-circle')} />
                </Grid>
                <Grid item className={classes.gridMargin}>
                    Pending
                </Grid>
                <Grid item>
                    <Icon className={clsx(classes.purpleIcon, 'fas fa-circle')} />
                </Grid>
                <Grid item className={classes.gridMargin}>
                    Filled
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(2),
    },
    inline: {
        display: 'inline',
    },
});

class MedicationsPage extends Component {
    constructor(props) {
        super(props);
    }

    renderMedication() {
        return this.props.prescriptions.map(px => (
            <Medication key={px._id} ContainerProps={px} />
        ));
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={0}
                >
                    <Grid item xs={6}>
                        <Paper className={classes.root}>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <Grid item>
                                    <Typography variant="h5" className={classes.inline}>
                                        Medications
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddMedicationDialog />
                                </Grid>
                            </Grid>
                            <Typography variant="body1">
                                Here is the list of your prescriptions. You can edit or
                                cancel any Medication before it is filled.
                            </Typography>
                            <Legend />
                            {this.renderMedication()}
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

// this checks that prescriptions and classes (for styling)
// are being passed as props to the Component
MedicationsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    prescriptions: PropTypes.array.isRequired,
};
const styledComponent = withStyles(styles)(MedicationsPage);
export default withTracker(() => {
    Meteor.subscribe('prescriptions');
    return {
        prescriptions: Prescriptions.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(styledComponent);
