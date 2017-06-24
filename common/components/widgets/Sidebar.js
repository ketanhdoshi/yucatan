// -----------------------------------------------------------------
// Presentational component for the Sidebar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import UserPanel from './UserPanel'
import SidebarSearch from './SidebarSearch'
import SidebarNav from './SidebarNav'
import SidebarMenu from './SidebarMenu'
import SidebarSubMenuItem from './SidebarSubMenuItem'

import s from '../../scss/Sidebar.scss'

const Sidebar = () => (
    
    <div className={"col-xs-6 col-sm-3 " + s.sidebar}>
        <UserPanel name="Alexander Brosnan" photo="built/user2-160x160.jpg" status="Online"/>
        <SidebarSearch />
        <SidebarNav>
            <SidebarMenu icon="fa-dashboard" title="Dashboard" subMenu="subDashboard">
                <SidebarSubMenuItem linkto="/dashboard1">Dashboard 1</SidebarSubMenuItem>
                <SidebarSubMenuItem linkto="/dashboard2">Dashboard 2</SidebarSubMenuItem>
            </SidebarMenu>                        
            <SidebarMenu icon="fa-files-o" title="Layout" subMenu="subLayout" badges={[{label: 3, bg: "bg-red"}, {label: 16, bg: "bg-aqua"}]}>
                <SidebarSubMenuItem>Layout 1</SidebarSubMenuItem>
                <SidebarSubMenuItem>Layout 2</SidebarSubMenuItem>
                <SidebarMenu icon="fa-eye" title="Two Level" subMenu="subTwoLevel" badges={[{label: "one", bg: "bg-red"}, {label: "two", bg: "bg-blue"}]}>
                    <SidebarSubMenuItem>Multi 1</SidebarSubMenuItem>
                    <SidebarSubMenuItem>Multi 2</SidebarSubMenuItem>
                </SidebarMenu>            
            </SidebarMenu>            
            <SidebarMenu icon="fa-calendar" title="Calendar" subMenu="subCalendar" badges={[{label: 12, bg: "bg-green"}, {label: 7, bg: "bg-yellow"}]}>
                <SidebarSubMenuItem linkto="/login">Cal 1</SidebarSubMenuItem>
                <SidebarSubMenuItem>Cal 2</SidebarSubMenuItem>
            </SidebarMenu>           
            <SidebarMenu icon="fa-refresh" title="Refresh" />
            <SidebarMenu icon="fa-pie-chart" title="Charts" subMenu="subChart">
                <SidebarSubMenuItem>ChartJS</SidebarSubMenuItem>
                <SidebarSubMenuItem>Morris</SidebarSubMenuItem>
                <SidebarSubMenuItem>Flot</SidebarSubMenuItem>
                <SidebarSubMenuItem>Inline</SidebarSubMenuItem>
            </SidebarMenu>                        
            <SidebarMenu icon="fa-laptop" title="UI Elements" subMenu="subUIElements">
                <SidebarSubMenuItem>General</SidebarSubMenuItem>
                <SidebarSubMenuItem>Button</SidebarSubMenuItem>
                <SidebarSubMenuItem>Sliders</SidebarSubMenuItem>
            </SidebarMenu>                        
            <SidebarMenu icon="fa-th" title="Widgets" badges={[{label: "New", bg: "bg-green"}]} />
            <SidebarMenu linkto="/bsview" icon="fa-list-alt" title="React-Bootstrap" />
            <SidebarMenu icon="fa-car" title="Redux Experiments" subMenu="subReduxExps">
                <SidebarSubMenuItem linkto="/properties">Properties</SidebarSubMenuItem>
                <SidebarSubMenuItem linkto="/matches">Matches</SidebarSubMenuItem>
                <SidebarSubMenuItem linkto="/shortlist">Shortlist</SidebarSubMenuItem>
            </SidebarMenu>
            <SidebarMenu linkto="/modals" icon="fa-bicycle" title="Modal Experiments" />
            <SidebarMenu linkto="/payment" icon="fa-money" title="Payment" badges={[{label: 5, bg: "bg-blue"}, {label: 8, bg: "bg-yellow"}, {label: 14, bg: "bg-aqua"}]} />
            <SidebarMenu linkto="/login" icon="fa-sign-in" title="Login" />
        </SidebarNav>
    </div>
    )

Sidebar.propTypes = {
}

export default Sidebar
