// -----------------------------------------------------------------
// Presentational component for the AppBody
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

import Drawer, {DrawerControl,
    DRAWER_MODE_OFF, DRAWER_MODE_MINI, DRAWER_MODE_FULL} from '../components/widgets/Drawer'

// -----------------------------------------------------------------
// Primary content area
// -----------------------------------------------------------------
const Content = ({toggleCB, toggleMode}) => (
    <main className="col-sm-9 col-6 pt-3" role="main">
        <DrawerControl toggleCB={toggleCB} toggleMode={toggleMode}/>
        {/* Sidebar toggle button for desktop only */}
        <a href=".drawerdesk" data-toggle="collapse"><i className="fa fa-desktop fa-lg"></i></a>
        {/* Sidebar toggle button for mobile only */}
        <a href=".drawermobile" data-toggle="collapse"><i className="fa fa-mobile fa-lg"></i></a>
        <a href="#sidebarlist" data-toggle="collapse"><i className="fa fa-navicon fa-lg"></i></a>
        <h1>Dashboard</h1>
    </main>
)

const SidebarRight = () => (
    <div></div>
)

class AppBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerMode: DRAWER_MODE_FULL // drawer mode
        } ;
        
        // This binding is necessary to make `this` work in the handleDayClick callback
        // Without it, 'this' will be undefined in the callback and calling this.setState 
        // in the callback will give an error
        // See https://facebook.github.io/react/docs/handling-events.html
        this.handleToggleMode = this.handleToggleMode.bind(this);
    }

    handleToggleMode () {
        let mode = this.state.drawerMode;
        switch (mode){
            case DRAWER_MODE_OFF:
                mode = DRAWER_MODE_FULL;
                break;
            case DRAWER_MODE_MINI:
                mode = DRAWER_MODE_FULL;
                break;
            case DRAWER_MODE_FULL:
                mode = DRAWER_MODE_MINI;
                break;
        }
        this.setState ( {drawerMode: mode});
    }
    
    render() {
        const { drawerMode } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <Drawer mode={drawerMode} />
                    <Content toggleCB={this.handleToggleMode} toggleMode={drawerMode}/>
                    {this.props.children}
                    <SidebarRight />
                </div>
            </div>
        )
    }
}

AppBody.propTypes = {
}

export default AppBody

const AppBodyOld = () => (
    <div className="container-fluid">
        <DrawerControl />
        <div className="row">
            <Drawer />
            <Content />
            <Aside />
        </div>
    </div>
)

