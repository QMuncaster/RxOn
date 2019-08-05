import React, {Component, PureComponent, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ProfileMenu from './ProfileMenu';
import {Link} from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

// reactive variable that we can override for logging out
// if just use this.props.currentUser, cannot set property to false before waiting for server response
// so the NavBar would take a couple seconds to disappear after logging out
let loggedIn = !!Meteor.user();
Tracker.autorun(() => {
    loggedIn = !!Meteor.user();
});

const styles = {
    grow: {
        flexGrow: 1,
    },

   // MuiDrawer_paper: {
   //  // flex:auto,
   //  display: flex,
   //  zIndex: 1200,
   //  outline: none,
   //  position: fixed,
   //  overflowY: auto,
   //  flexDirection: column,
   //  webkitOverflowScrolling: touch
   //  }

};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        };

    }



    handleDrawerToggle() {
       this.setState({open:!this.state.open})
    }


    render() {
        const { classes } = this.props;
        // const links = Meteor.user().roles ==="admin"? ["/home","/profile","/patients"]: ["/home","/profile"];
        const links = ["/home","/profile","/patients"];
        const tabs = ['Home', 'Profile', 'Patients'];


        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>{ tabs.map((text, index) => (
                    <ListItem button component="a" key={text} href={links[index]}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}

                </List>
                <Divider />
            </div>
        );

        if (loggedIn) {
            return (
                <div className={classes.grow}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={()=>this.handleDrawerToggle()}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h5" color="inherit" className={classes.grow}>
                                Welcome {this.props.currentUser.firstname}
                            </Typography>
                            <ProfileMenu />
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.open}
                        // onClose={this.handleDrawerToggle}
                    >
                        <div >
                            <IconButton onClick={this.handleDrawerToggle.bind(this)}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        {drawer}
                    </Drawer>
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
