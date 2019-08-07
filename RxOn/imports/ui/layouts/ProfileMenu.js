import React, { Component } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
};

export default class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl: null };
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;
        return (
            <div>
                <IconButton edge="end" color="inherit" onClick={this.handleClick}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    disableAutoFocusItem={true}
                >
                    <MenuItem onClick={this.handleClose}>
                        <Link to="/profile" style={linkStyle}>
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link to="/logout" style={linkStyle}>
                            Logout
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}
