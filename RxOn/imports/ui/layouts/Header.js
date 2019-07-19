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
        this.state = { userStatus: loggedIn };
    }

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
                                Welcome {this.props.currentUser.firstname}
                            </Typography>
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
