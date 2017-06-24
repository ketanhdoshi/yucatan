// -----------------------------------------------------------------
// Presentational component for the example Navbar
// Written as an example in the original Redux experiment.
// Will most probably not be required post the CSS and Bootstrap revamp 
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const NavbarFull = (props) => (
    <div>
        <h1>Navbar full</h1>

        <ul className="nav nav-tabs">
          <li role="presentation"><Link to="/home">Home</Link></li>
          <li role="presentation"><Link to="/matches" activeStyle={{ color: 'red' }}>Matches</Link></li>
          <li role="presentation"><Link to="/payment" activeStyle={{ color: 'red' }}>Payment</Link></li>
          <li role="presentation"><Link to="/hello">Hello</Link></li>
          <li role="presentation"><Link to="/login">Login</Link></li>
        </ul>

        {props.children}
    </div>
)

export default NavbarFull
