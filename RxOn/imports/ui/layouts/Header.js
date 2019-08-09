import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/AccountBox';
import PatientsIcon from '@material-ui/icons/SupervisorAccount';
import ProfileMenu from './ProfileMenu';

const drawerWidth = 200;
const linkStyle = {
    color: 'black',
    textDecoration: 'none',
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    links: {
        color: 'black',
        textDecoration: 'none',
    },
}));

function Header(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { user, firstName } = props;
    let tabs = ['Home', 'Profile'];
    let links = ['/home', '/profile', '/patients'];

    if (Roles.userIsInRole(user, 'admin')) {
        tabs = ['Home', 'Profile', 'Patients'];
    }

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function iconRender(text) {
        switch (text) {
            case 'Home':
                return <HomeIcon />;
            case 'Profile':
                return <ProfileIcon />;
            case 'Patients':
                return <PatientsIcon />;
            default:
                return null;
        }
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap className={classes.grow}>
                        {firstName ? 'Welcome ' + firstName : 'Welcome'}
                    </Typography>
                    <ProfileMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {tabs.map((text, index) => (
                        <Link to={links[index]} style={linkStyle} key={text}>
                            <ListItem button key={text}>
                                <ListItemIcon>{iconRender(text)}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default withTracker(() => {
    Meteor.subscribe('userData');
    let user = Meteor.users.findOne();
    return {
        user,
        firstName: user ? user.firstname : ' ',
    };
})(Header);
