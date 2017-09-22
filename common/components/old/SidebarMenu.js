// -----------------------------------------------------------------
// Presentational component for a menu in the Sidebar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import s from '../../scss/SidebarNav.scss'

const SidebarMenu = (props) => {
    let aOpt = {}
    if (props.subMenu) {
        aOpt = {
            'data-target': "#" + props.subMenu,        
            'data-toggle': "collapse",
            'className': "collapsed"
        }        
    }
    let linkto = props.linkto ? props.linkto : "#"
    
    return (
        <li>        
            <Link to={linkto} {...aOpt} >
                <i className={"fa " + props.icon}></i>
                <span className="collapse in hidden-xs">{props.title}
                    { props.subMenu ? <i className="fa fa-angle-left pull-right"></i> : null }
                    { props.badges ? 
                        props.badges.map((badge, index) => (
                            <span key={index} className={"label pull-right " + badge.bg}>{badge.label}</span>
                        ))
                        : null
                    }
                </span>
            </Link>
            { props.subMenu ?
                <ul className={"nav collapse " + s.sidebarSub} id={props.subMenu}>
                    {props.children}
                </ul>
                : null
            }
        </li>
    )
}

SidebarMenu.propTypes = {
}

export default SidebarMenu
