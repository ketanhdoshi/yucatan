// -----------------------------------------------------------------
// Presentational component for the Search Box in the Sidebar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../../scss/SidebarSearch.scss'

const SidebarSearch = () => (
    
    <form action="#" method="get" className={s.sidebarForm}> 
        <div className="input-group">
            <input type="text" name="q" className="form-control" placeholder="Search..."/>
            <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                    <i className="fa fa-search"></i>
                </button>
            </span>
        </div>
    </form>
)

SidebarSearch.propTypes = {
}

export default SidebarSearch
