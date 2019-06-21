import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import './styling/Navbar.css'
import { withTracker } from 'meteor/react-meteor-data';

class Navbar extends Component {
    
    logout = () => {
        Meteor.logout((error) => {
            if (error) {alert(error)}
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <nav className="navWrapper">
                <div className="container">
                    <ul className="right">
                        {/* Only show logout button if someones logged i */}
                        {/* This should be done for the profile tab as well but honestly its getting too complicated */}
                        {/* Might be easier to have a "loggedInNavBar" and a "loggedOutNavBar" component */}
                        {this.props.currentUser ?
                            <li className="li" ><Link to="/" 
                                onClick={this.logout}
                                style={{ color: 'white', textDecoration: 'none' }} > Logout </Link> </li>
                            : ''}
                        <li className="li"> <Link to="/patient/profile" style={{ color: 'white', textDecoration: 'none' }} > Profile  </Link></li>
                        <li className="li"> <Link to="/home" style={{ color: 'white', textDecoration: 'none' }} > Home  </Link></li>
                        {/* The welcome message below for logged in users probably shouldn't be a list element either */}
                        {this.props.currentUser ?
                            <li className="li" style={{ color: 'white', textDecoration: 'none' }}>
{                            console.log(this.props)}
                                {this.props.currentUser.firstname + " " + this.props.currentUser.lastname}
                            </li>
                            : ''};

                    </ul>
                </div>
            </nav>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('userData');

    return {
        currentUser: Meteor.user()
    };
})(Navbar);
