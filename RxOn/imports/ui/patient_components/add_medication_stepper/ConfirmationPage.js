import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default class ConfirmationPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            values: { rxName, rxStrength, rxDose, imgLink, refill },
        } = this.props;
        return (
            <React.Fragment>
                <Typography variant="body1">
                    Please review information entered before submitting
                </Typography>
                <br />
                <List>
                    <ListItem alignItems="flex-start" divider={true}>
                        <ListItemText primary="Medication Name: " secondary={rxName} />
                    </ListItem>
                    <ListItem alignItems="flex-start" divider={true}>
                        <ListItemText
                            primary="Medication Strength: "
                            secondary={rxStrength}
                        />
                    </ListItem>
                    <ListItem alignItems="flex-start" divider={true}>
                        <ListItemText primary="Medication Dose: " secondary={rxDose} />
                    </ListItem>
                    <ListItem alignItems="flex-start" divider={true}>
                        <ListItemText primary={'Number of eligible refill: ' + refill} />
                    </ListItem>
                    <ListItem alignItems="flex-start" divider={true}>
                        <Link href={imgLink} target="_blank" color="primary">
                            Uploaded Prescription
                        </Link>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}
