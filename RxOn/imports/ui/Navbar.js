import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import './styling/Navbar.css'
import { withTracker } from 'meteor/react-meteor-data';

class Navbar extends Component {

    logout = () => {
        Meteor.logout((error) => {
            if (error) { alert(error) }
        })
    }

    render() {
        if (Meteor.user()) {
            return (
                <nav className="navWrapper">
                    <div className="container">
                        <ul className="right">
                            <li className="li" ><Link to="/" onClick={this.logout} style={{ color: 'white', textDecoration: 'none' }} > Logout </Link> </li>
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
        currentUser: Meteor.user()   // not really using right now, but leaving in for account types later
    };
})(Navbar);