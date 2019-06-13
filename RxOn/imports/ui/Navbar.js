import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './styling/Navbar.css'

const Navbar = () => {
    return (
        <nav className = "navWrapper">
            <div className = "container">
                <ul className = "right">
                 <li className = "li" ><Link to="/" style = {{color: 'white',textDecoration: 'none'}} > Logout </Link> </li>
                    <li className = "li"> <Link to="/patient/profile" style = {{color: 'white',textDecoration: 'none'}} > Profile  </Link></li>
                    <li className = "li"> <Link to="/home" style = {{color: 'white', textDecoration: 'none'}} > Home  </Link></li> 
                </ul>
            </div>
        </nav>
    )
}

export default Navbar