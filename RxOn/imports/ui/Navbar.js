import React from 'react'
import './styling/Navbar.css'

const Navbar = () => {
    return (
        <nav className = "navWrapper">
            <div className = "container">
                <ul className = "right">
                    <li className = "li">  Logout  </li>
                    <li className = "li">  Profile  </li>
                    <li className = "li"> Home  </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar