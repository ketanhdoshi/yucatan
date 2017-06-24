// -----------------------------------------------------------------
// Presentational component for the example Navbar
// Written as an example in the original Redux experiment.
// Will most probably not be required post the CSS and Bootstrap revamp 
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const NavbarMini = (props) => (
    <div>
        <h1>Navbar Mini</h1>
        <ul role="nav">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </ul>

        {props.children}
    </div>
)

export default NavbarMini
