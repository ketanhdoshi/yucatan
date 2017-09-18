// -----------------------------------------------------------------
// Presentational component for the AppBody
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

import { injectGlobal } from 'styled-components';

/* TODO - temporarily hardcoded only for testing */
injectGlobal`
    @font-face {
        font-family: 'Source Sans Pro';
        src: url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic');
    }

    body {
        height: 100%;
    }
`;

// -----------------------------------------------------------------
// SideMenu component
// -----------------------------------------------------------------
const SideMenu = styled.nav.attrs({
    className: 'h-100',
})`
    /* Background colour of the Sidebar */
    background-color: #222d32;

    /* TODO - temporarily hardcoded only for testing */
    font-weight: 400;
    font-size: 14px;

    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
`;

// -----------------------------------------------------------------
// NavLinkMenu component
// -----------------------------------------------------------------
const NavLinkMenu = styled.a.attrs({
    className: 'nav-link',
})`
    color: red;

    /* Put a down-arrow or up-arrow next to sub-menus */
    &.collapsed:after {
        content: "▾";
    }
    &:not(.collapsed):after {
        content: "▴";
    }
`;

// -----------------------------------------------------------------
// MenuItem component
// -----------------------------------------------------------------
const MenuItem = styled.a.attrs({
    className: '',
})`
    /* Text colour of menu item */
    color: #b8c7ce;

    /* This is a vertical strip on the Left border, highlighted during hover */
    /* On hover, highlight the left border strip, and change the text colour */
    border-left: 5px solid transparent;
    &:hover,
    &:focus {
        color: #ffffff;
        background: #1e282c;
        border-left-color: #3c8dbc;
    }
`;

// -----------------------------------------------------------------
// MenuItem with a sub-menu component
// Example of extending an already styled component
// -----------------------------------------------------------------
const MenuItemWithSub = styled(MenuItem)`
    /* Put a down-arrow or up-arrow next to sub-menus */
    &.collapsed:after {
        content: "▾";
        text-align: right;
    }
    &:not(.collapsed):after {
        content: "▴";
        text-align: right;
    }
`;

// -----------------------------------------------------------------
// SubMenuItem component
// -----------------------------------------------------------------
const SubMenuItem = styled.a.attrs({
    className: '',
})`
    /* Text colour of menu item */
    color: #8aa4af;

    /* Add a border to line it up with other MenuItems since there is no 
        left border strip. We need to set only the left-width here but for 
        some reason that doesn't take effect unless we set the border-style
        and background as well */
    border-left: 5px solid #2c3b41;

    /* On hover, change the text colour */
    &:hover,
    &:focus {
        color: #ffffff;
        background: #2c3b41;
    }
`;

// -----------------------------------------------------------------
// SubMenu component
// -----------------------------------------------------------------
const SubMenu = styled.div.attrs({
    className: '',
})`
    /* Background of sub-menus */
    background: #2c3b41;

    /* Show the title on the side when you hover on the list item. Happens only 
        when title is collapsed in Mini mode  */
    /* TODO */
    li:hover &.collapse {
        display: block !important;
        position: absolute;
        width: 180px;
        left: 46px; /* was 50px, needed to align left edge of hover menu with sidebar right edge */
    }
`;

// -----------------------------------------------------------------
// MenuTitle component
// -----------------------------------------------------------------
const MenuTitle = styled.span.attrs({
    className: '',
})`
    /* Like a flex-grow - expand to take up available space */
    flex: 1;

    /* Show the title on the side when you hover on the list item. Happens only 
        when title is collapsed in Mini mode  */
    li:hover &.collapse {
        display: block !important;
        position: absolute;
        width: 180px;
        left: 46px; /* was 50px, needed to align left edge of hover menu with sidebar right edge */
    }
`;

const DRAWER_MODE_OFF = 1;  // Drawer is off-canvas and not visible
const DRAWER_MODE_MINI = 2; // Drawer is in collapsed state
const DRAWER_MODE_FULL = 3; // Drawer is fully visible

// -----------------------------------------------------------------
// Menu item in the drawer.
//      icon - icon for the menu item
//      title - title for the menu item
//      badge1 - optional
//      badge2 - optional
//      subMenuId - Id of the sub-menu if present, else null
//      parentId - Id of the parent sub-menu if it is second-level else null
// -----------------------------------------------------------------
const DrawerMenuItem = ({mode, icon, title, badge1, badge2, subMenuId, parentId}) => {
    // There are three cases:
    // 1) First-level menu item
    // 2) First-level menu item with a sub-menu
    // 3) Second-level menu item

    if (subMenuId) {
        // Collapse the title for Mini mode
        let miniCss = '';
        if (mode === DRAWER_MODE_MINI)
            miniCss = 'collapse';
        
        return (
            <MenuItemWithSub className="nav-link collapsed d-flex align-items-center py-2 pr-1" 
                href={subMenuId} data-toggle="collapse" data-target={subMenuId}>
                <i className={"fa " + icon}></i>
                <MenuTitle className={"ml-2 " + miniCss}>{title}</MenuTitle>
            </MenuItemWithSub>
        )
    }
    else if (parentId) {
        // In mini mode, all second level menus should be closed ie. invisible
        // let miniCss = '';
        // if (mode === DRAWER_MODE_MINI)
        //    return null;
        // TODO
        
        return (
            <SubMenuItem className="nav-link d-flex align-items-center py-1 pr-1" href="#" data-parent={parentId}>
                <i className={"fa " + icon}></i>
                <MenuTitle className="ml-2">{title}</MenuTitle>
            </SubMenuItem>
        )
    }
    else {
        // Collapse the title for Mini mode
        let miniCss = '';
        if (mode === DRAWER_MODE_MINI)
            miniCss = 'collapse';
        
        return (
            <MenuItem className="nav-link d-flex align-items-center py-2 pr-1" href="#">
                <i className={"fa " + icon}></i>
                <MenuTitle className={"ml-2 " + miniCss}>{title}
                    {badge1 ? <span className="badge badge-success float-right mr-1">{badge1}</span> : null}
                    {badge2 ? <span className="badge badge-info float-right mr-1">{badge2}</span> : null}
                </MenuTitle>
            </MenuItem>
        )
    }
}

// -----------------------------------------------------------------
// TODO
// Transitions - too slow, also happen for sub-menu expansion
// react-responsive - use media queries for mobile off-canvas drawer
// Mini drawer - the down-arrow still shows up for sub-menus
// Mini drawer - sub-menus should show on the right on hover
// Drawer Control - should go on Navbar
// Drawer should take a fully declarative json menu structure
// Alternative way to do title shrink in Drawer Mini without using collapse plugin 
// Multi-level sub-menus
// Make proper components, and for widgets vs app screens
// Use Reactstrap
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Controls the visibility mode of the Drawer - FULL, NONE, MINI
// -----------------------------------------------------------------
const DrawerControl = ({toggleCB, toggleMode}) => {
    let icon = null;
    if (toggleMode) {
        icon = "fa-mobile";
    }
    else {
        icon = "fa-desktop";
    }
    return (
        <a href=".drawerdesk" data-toggle="collapse" onClick={toggleCB}>
            <i className={"fa fa-lg " + icon}></i>
        </a>
    )
}

// -----------------------------------------------------------------
// Drawer component
// Off-canvas sidebar toggle works in two modes: 
// 1) Desktop mode - the sidebar is always visible but shrinks and grows 
// when toggled. This is achieved by expanding or collapsing some 'span' elements
// for the menu text and the sub-menus.
// 2) Mobile mode - the sidebar is not visible by default, but slides in and out
// when toggled. This is achieved by expanding the entire sidebar
// The toggle button is different in the two cases, so is the behaviour and so
// is the mechanism for achieving that behaviour. In both cases, the expanding 
// and collapsing is achieved using the Collapse functionality
// -----------------------------------------------------------------
const Drawer = ({mode, id}) => {
    let colCss = '';
    switch (mode){
        case DRAWER_MODE_OFF:
            break;
        case DRAWER_MODE_MINI:
            colCss = "col-1 ";
            break;
        case DRAWER_MODE_FULL:
            colCss = "col-3 ";
            break;
    }
    return (
        <SideMenu className={colCss} id={id}>
            <ul className="nav flex-column">
                <li className="nav-item" data-parent={"#" + id}>
                    <DrawerMenuItem mode={mode} icon="fa-heart"
                            title="Item 1" badge1="6" badge2="12" />
                </li>
                <li className="nav-item" data-parent={"#" + id}>
                    <DrawerMenuItem mode={mode} icon="fa-list"
                            title="Item 2" subMenuId="#submenu2" />
                    <SubMenu className="collapse fade" id="submenu2" aria-expanded="false">
                        <ul className="flex-column nav">
                            <li className="nav-item">
                                <DrawerMenuItem mode={mode} icon="fa-circle-o"
                                    title="Item 1a" parentId="#submenu2" />
                            </li>
                        </ul>
                    </SubMenu>
                </li>
            </ul>
        </SideMenu>
    )
}

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


// -----------------------------------------------------------------
// Experimental Drawer using Bootstrap CSS
// -----------------------------------------------------------------
const DrawerBs = () => (
    // A collapse class would normally mean that this item is collapsed and therefore
    // not visible. However it gets overriden by the d-sm-block class and so it
    // is shown on devices of size sm and larger. On phone sizes smaller than sm, that
    // class doesn't apply and hence the collapse becomes effective. Hence on phones
    // the sidebar is not shown initially. Also, we could have used a d-flex class
    // instead of the d-block class, but that caused the child <ul> element below it
    // to not be full width
    <SideMenu className="col-sm-3 col-6 collapse d-sm-block bg-faded p-0 drawermobile" id="sidebar">
        <ul className="nav flex-column">
            <li className="nav-item" data-parent="#sidebar">
                <MenuItem className="nav-link d-flex align-items-center py-2 pr-1" href="#">
                    <i className="fa fa-heart"></i>
                    <MenuTitle className="collapse show drawerdesk ml-2">Item 1
                        <span className="badge badge-success float-right mr-1">6</span>
                        <span className="badge badge-info float-right mr-1">12</span>
                    </MenuTitle>
                </MenuItem>
            </li>
            <li className="nav-item" data-parent="#sidebar">
                <MenuItem className="nav-link collapsed d-flex align-items-center py-2 pr-1" href="#submenu2"
                        data-toggle="collapse" data-target="#submenu2">
                    <i className="fa fa-list"></i>
                    <MenuTitle className="collapse show drawerdesk ml-2">Item 2</MenuTitle>
                </MenuItem>
                <SubMenu className="collapse fade" id="submenu2" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li className="nav-item">
                            <SubMenuItem className="nav-link d-flex align-items-center py-1 pr-1" href="#" data-parent="#submenu2">
                                <i className="fa fa-circle-o"></i>
                                <span className="ml-2">Item 1a</span>
                            </SubMenuItem>
                        </li>
                    </ul>
                </SubMenu>
            </li>
        </ul>
    </SideMenu>
)


// -----------------------------------------------------------------
// Experimental Drawer using Nav classes
// -----------------------------------------------------------------
const DrawerNav = () => (
        <SideMenu className="col-2 collapse d-md-flex bg-faded pt-2" id="sidebarnav">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="fa fa-laptop"></i>Overview
                    </a>
                </li>
                <li className="nav-item">
                    <NavLinkMenu className="collapsed" href="#submenu1" data-toggle="collapse" data-target="#submenu1">
                        <i className="fa fa-circle-o"></i>Reports
                    </NavLinkMenu>
                    <div className="collapse fade" id="submenu1" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item"><a className="nav-link py-0" href="#">Orders</a></li>
                            <li className="nav-item">
                                <NavLinkMenu className="nav-link collapsed py-0" href="#submenu1sub1" data-toggle="collapse" data-target="#submenu1sub1">Customers</NavLinkMenu>
                                <div className="collapse small" id="submenu1sub1" aria-expanded="false">
                                    <ul className="flex-column nav pl-4">
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-clock-o"></i> Daily
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-dashboard"></i> Dashboard
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-bar-chart"></i> Charts
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-compass"></i> Areas
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">Analytics</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Export</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
            </ul>
        </SideMenu>
)

// -----------------------------------------------------------------
// Experimental Drawer using List classes
// -----------------------------------------------------------------
const DrawerList = () => (
        <div className="col-md-3 col-xs-1 p-l-0 p-r-0 collapse d-md-flex" id="sidebarlist">
            <div className="list-group panel">
                <a href="#menu1" className="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebarlist" aria-expanded="false"><i className="fa fa-dashboard"></i> <span className="d-none d-md-block">Item 1</span> </a>
                <div className="collapse" id="menu1">
                    <a href="#menu1sub1" className="list-group-item" data-toggle="collapse" aria-expanded="false">Subitem 1 </a>
                    <div className="collapse" id="menu1sub1">
                        <a href="#" className="list-group-item" data-parent="#menu1sub1">Subitem 1 a</a>
                        <a href="#" className="list-group-item" data-parent="#menu1sub1">Subitem 2 b</a>
                        <a href="#menu1sub1sub1" className="list-group-item" data-toggle="collapse" aria-expanded="false">Subitem 3 c </a>
                        <div className="collapse" id="menu1sub1sub1">
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub1">Subitem 3 c.1</a>
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub1">Subitem 3 c.2</a>
                        </div>
                        <a href="#" className="list-group-item" data-parent="#menu1sub1">Subitem 4 d</a>
                        <a href="#menu1sub1sub2" className="list-group-item" data-toggle="collapse"  aria-expanded="false">Subitem 5 e </a>
                        <div className="collapse" id="menu1sub1sub2">
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub2">Subitem 5 e.1</a>
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub2">Subitem 5 e.2</a>
                        </div>
                    </div>
                    <a href="#" className="list-group-item" data-parent="#menu1">Subitem 2</a>
                    <a href="#" className="list-group-item" data-parent="#menu1">Subitem 3</a>
                </div>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-film"></i> <span className="hidden-sm-down">Item 2</span></a>
                <a href="#menu3" className="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebarlist" aria-expanded="false"><i className="fa fa-book"></i> <span className="d-none d-md-block">Item 3 </span></a>
                <div className="collapse" id="menu3">
                    <a href="#" className="list-group-item" data-parent="#menu3">3.1</a>
                    <a href="#menu3sub2" className="list-group-item" data-toggle="collapse" aria-expanded="false">3.2 </a>
                    <div className="collapse" id="menu3sub2">
                        <a href="#" className="list-group-item" data-parent="#menu3sub2">3.2 a</a>
                        <a href="#" className="list-group-item" data-parent="#menu3sub2">3.2 b</a>
                        <a href="#" className="list-group-item" data-parent="#menu3sub2">3.2 c</a>
                    </div>
                    <a href="#" className="list-group-item" data-parent="#menu3">3.3</a>
                </div>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-heart"></i> <span className="d-none d-md-block">Item 4</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-list"></i> <span className="d-none d-md-block">Item 5</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-clock-o"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-th"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-gear"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-calendar"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-envelope"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-bar-chart-o"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-star"></i> <span className="d-none d-md-block">Link</span></a>
            </div>
        </div>    
)

const Prog = styled.div`
	/* Adapt the width based on primary prop */
        background: purple;
	transition: all 0.25s ease-in-out;
`;

// -----------------------------------------------------------------
// DrawerExample component
// -----------------------------------------------------------------
const DrawerExample = () => (
    <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav flex-column">
            <li className="nav-item">
                <a className="nav-link" href="#">Overview <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Reports</a>
            </li>
        </ul>
    </nav>
)