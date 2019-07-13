import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu';

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
            <AppBar position='static'>
               <Toolbar>
                  <IconButton edge='start' color='inherit'>
                     <MenuIcon />
                  </IconButton>
                  <Typography variant='h5' color='inherit' className={classes.grow}>
                     {/*Sublime is a word that allows me identify whether Roboto font is being used*/}
                     Sublime
                  </Typography>
                  <ProfileMenu />
               </Toolbar>
            </AppBar>
         </div>
      );
   }
}
export default withStyles(styles)(Header);
