import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

export default function ProfileMenu() {
   const [anchorEl, setAnchorEl] = React.useState(null);

   function handleClick(event) {
      setAnchorEl(event.currentTarget);
   }

   function handleClose() {
      setAnchorEl(null);
   }

   return (
      <div>
         <IconButton edge='end' color='inherit' onClick={handleClick}>
            <AccountCircle />
         </IconButton>
         <Menu id='profile-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
         </Menu>
      </div>
   );
}
