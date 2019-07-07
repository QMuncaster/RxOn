import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker';
import { withRouter } from "react-router-dom";
import './styling/Navbar.css'

// reactive variable that we can override for logging out
// if just use this.props.currentUser, cannot set property to false before waiting for server response
// so the NavBar would take a couple seconds to disappear after logging out
let loggedIn = !!Meteor.user();
Tracker.autorun(() => {
    loggedIn = !!Meteor.user();
});

class Navbar extends Component {

    logout = () => {
        loggedIn = false; 
        this.forceUpdate();
    }

    render() {

        if (loggedIn) {
            return (
                <nav className="navWrapper">
                    <div className="container">
                        <ul className="right">
                            <li className="li" ><Link to="/logout" onClick={this.logout} style={{ color: 'white', textDecoration: 'none' }} > Logout </Link> </li>
                            <li className="li"> <Link to="/patient/profile" style={{ color: 'white', textDecoration: 'none' }} > Profile  </Link></li>
                            <li className="li"> <Link to="/home" style={{ color: 'white', textDecoration: 'none' }} > Home  </Link></li>
                            {/* TODO: change welcome message CSS on hover so not mistaken as a navbar link */}
                            <li className="li" style={{ color: 'white', textDecoration: 'none' }}>
                                {"Welcome " + this.props.currentUser.firstname + " " + this.props.currentUser.lastname}
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
        else return (
            <nav className="navWrapper">
            </nav>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('userData');

    return {
        currentUser: Meteor.user()
    };
})(withRouter(Navbar));