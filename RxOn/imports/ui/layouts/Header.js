import React, { Component, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker';
import { withRouter } from 'react-router-dom';

let loggedIn = !!Meteor.user();
Tracker.autorun(() => {
    loggedIn = !!Meteor.user();
});

const styles = {
    grow: {
        flexGrow: 1,
    },
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {userStatus: loggedIn};
    }

    logout = () => {
        loggedIn = false;
        this.forceUpdate();
    };

    render() {
        const { classes } = this.props;
        if (loggedIn) {
            return (
                <div className={classes.grow}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h5" color="inherit" className={classes.grow}>
                                {/*Sublime is a word that allows me identify whether Roboto font is being used*/}
                                Sublime
                            </Typography>
                            {/*Passing down the sate */}
                            <ProfileMenu />
                        </Toolbar>
                    </AppBar>
                </div>
            );
        } else {
            return null;
        }
    }
}

const StyledHeader = withStyles(styles)(Header);

export default withTracker(() => {
    Meteor.subscribe('userData');
    return {
        currentUser: Meteor.user(),
    };
})(withRouter(StyledHeader));
