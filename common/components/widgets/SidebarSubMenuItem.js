// -----------------------------------------------------------------
// Presentational component for the Sidebar sub-menus
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const SidebarSubMenuItem = (props) => {
    let linkto = props.linkto ? props.linkto : "#"
    
    return (    
        <li><Link to={linkto}><i className="fa fa-circle-o"></i>{props.children}</Link></li>
    )
}

SidebarSubMenuItem.propTypes = {
}

export default SidebarSubMenuItem
