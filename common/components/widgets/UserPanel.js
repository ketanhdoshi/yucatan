// -----------------------------------------------------------------
// Presentational component for the User Panel in the Sidebar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../../scss/UserPanel.scss'

const UserPanel = (props) => (
    
    <div className={s.userPanel}>
        <div className={"pull-left " + s.image}>
            <img src={props.photo} className="img-circle" alt="User Image"/>
        </div>
        <div className={"pull-left " + s.info}>
            <p>{props.name}</p>
            <a href="#"><i className="fa fa-circle text-success"></i>{props.status}</a>
        </div>
    </div>                
)

UserPanel.propTypes = {
}

export default UserPanel
