// -----------------------------------------------------------------
// Presentational component for the top-level container for all
// navigational menus in the Sidebar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../../scss/SidebarNav.scss'

const SidebarNav = (props) => (
    
    <ul className={"nav " + s.sidebarNav}>
        {props.children}
    </ul>
)

SidebarNav.propTypes = {
}

export default SidebarNav
