// -----------------------------------------------------------------
// Presentational component for the Navbar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Navbar = (props) => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">{props.brand}</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" data-toggle="offcanvas">Off-Canvas</a></li>
                    <li><Link to="/home" activeStyle={{ color: 'red' }}>Home</Link></li>
                    <li><a href="#">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
)

export default Navbar
