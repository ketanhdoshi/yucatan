// -----------------------------------------------------------------
// Presentational component for all logged-in pages across the app
// Has the basic overall skeleton layout into which all screens are placed
// Layout contains Navbar, Sidebar and a Content area. Most screens
// will populate themselves in the Content area. 
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Navbar from './widgets/Navbar'
import Footer from './widgets/Footer'
import Sidebar from './widgets/Sidebar'
import ContentHeader from './widgets/ContentHeader'

import s from '../scss/Main.scss'

const MainView = ({ first, children, onDummyClick }) => (
    <div>
        <Navbar brand={first}/>
        <div className="container-fluid">
            <div className={"row " + s.main}>
                <Sidebar />
                <div className={"col-xs-12 col-sm-9 " + s.content}>
                    <ContentHeader header="Stuff"/>
                    {children}
                </div>
            </div>
    
            <Footer msg="This is my footer"/>
        </div>
    </div>
)

MainView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default MainView
