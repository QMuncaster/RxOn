import React, { Component, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

const styles = {
    grow: {
        flexGrow: 1,
    },
};

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
            return (
                <div className={classes.grow}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h5" color="inherit" className={classes.grow}>
                                {this.props.firstName? "Welcome " + this.props.firstName : "Welcome"}
                            </Typography>
                            <ProfileMenu />
                        </Toolbar>
                    </AppBar>
                </div>
            );
    }
}

const StyledHeader = withStyles(styles)(Header);
// export default withRouter(StyledHeader);
export default withTracker(() => {
    Meteor.subscribe('userData');
    let currentUser = Meteor.users.findOne();
    return {
        firstName: currentUser? currentUser.firstname : ' ',
    };
})(withRouter(StyledHeader));