import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MedicationInput from './MedicationInput';
import ImageUpload from './ImageUpload';
import ConfirmationPage from './ConfirmationPage';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    connectorActive: {
        '& $connectorLine': {
            borderColor: theme.palette.secondary.main,
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
            borderColor: theme.palette.primary.main,
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
            borderColor: theme.palette.grey[100],
        },
    },
    connectorLine: {
        transition: theme.transitions.create('border-color'),
    },
});

class MedicationStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            rxName: '',
            rxStrength: '',
            rxDose: '',
            refill: 0,
            imgId: '',
            imgLink: '',
        };
    }

    handleSubmit = () => {
        const {
            activeStep,
            rxName,
            rxStrength,
            rxDose,
            refill,
            imgId,
            imgLink,
        } = this.state;
        const { firstname, lastname } = this.props.user;
        this.setState({
            activeStep: activeStep + 1,
        });
        Meteor.call(
            'prescriptions.insert',
            rxName,
            rxStrength,
            rxDose,
            firstname,
            lastname,
            refill,
            imgId,
            imgLink,
            (err, result) => {
                if (err) {
                    alert('Medication Add Error');
                }
            }
        );
    };

    handleClose = () => {};

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleChange = input => e => {
        let val = e.target.value;
        if (e.target.type === 'number') {
            val = parseInt(val, 10);
        }
        this.setState({ [input]: val });
    };

    setViewLink = val => {
        this.setState({ imgLink: val });
    };

    setImgId = val => {
        this.setState({ imgId: val });
    };

    getStepContent = (step, values) => {
        switch (step) {
            case 0:
                return (
                    <MedicationInput handleChange={this.handleChange} values={values} />
                );
            case 1:
                return <ImageUpload setLink={this.setViewLink} setId={this.setImgId} />;
            case 2:
                return <ConfirmationPage values={values} />;
            default:
                return null;
        }
    };

    render() {
        const { classes, handleClose } = this.props;
        const { activeStep, rxName, rxStrength, rxDose, refill, imgLink } = this.state;
        const values = { rxName, rxStrength, rxDose, refill, imgLink };
        const steps = ['Add Medication', 'Upload Prescription', 'Review and Submit'];
        const connector = (
            <StepConnector
                classes={{
                    active: classes.connectorActive,
                    completed: classes.connectorCompleted,
                    disabled: classes.connectorDisabled,
                    line: classes.connectorLine,
                }}
            />
        );
        return (
            <div className={classes.root}>
                <Stepper alternativeLabel activeStep={activeStep} connector={connector}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you're prescription has been sent!
                            </Typography>
                            <Button className={classes.button} onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    ) : (
                        <React.Fragment>
                            <Typography className={classes.instructions} />
                            {this.getStepContent(activeStep, values)}
                            <br />
                            <Button
                                onClick={activeStep === 0 ? handleClose : this.handleBack}
                                className={classes.button}
                            >
                                {activeStep === 0 ? 'Cancel' : 'Back'}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={
                                    activeStep === steps.length - 1
                                        ? this.handleSubmit
                                        : this.handleNext
                                }
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

const styledStepper = withStyles(styles)(MedicationStepper);

export default withTracker(() => {
    Meteor.subscribe('userData');
    return {
        user: Meteor.user(),
    };
})(styledStepper);
