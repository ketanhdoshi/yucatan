// -----------------------------------------------------------------
// The Navbar widget defines the Navbar at the top of the screen. It has a
// certain structure that includes
// 1) Logo
// 2) Collapsible section that collapses on mobile screens and is expandible
// with a Toggler
// 3) Text Menu section with menu items and dropdowns
// 4) Icon Menu section with menu items and dropdowns. This section does not 
// collapse
// 5) Form section which could include form elements eg. a search bar, button
// 
// The details of all of these sections are not defined inside this widget as
// it is generic. The details are passed in declaratively
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';
import DropdownNotification from '../../widgets/DropdownNotification'
import { Link } from 'react-router-dom'

// -----------------------------------------------------------------
// Navbar component
// -----------------------------------------------------------------
const NavbarWrap= styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
`;

// -----------------------------------------------------------------
// NavbarBrand component
// -----------------------------------------------------------------
const NavbarBrand = styled.a.attrs({
    className: 'navbar-brand',
})`
    display: inline-block;
    width: 250px;
    height: 60px;
    padding: .5rem 1rem;
    margin-right: 0;
    background-color: #20a8d8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 90px auto;
    border-bottom: 1px solid #1985ac;
`;

// -----------------------------------------------------------------
// NavItem component
// -----------------------------------------------------------------
const NavItem = styled.li.attrs({
    className: 'nav-item',
})`
`;

// -----------------------------------------------------------------
// NavItem Dropdown component
// -----------------------------------------------------------------
const NavItemDropdown = styled.li.attrs({
    className: 'nav-item dropdown',
})`
`;

// -----------------------------------------------------------------
// NavLink component
// !!!!!!! We've replaced this with RouterLink. Make sure that all the
// styles get transferred to that.
// -----------------------------------------------------------------
const NavLink = styled.a.attrs({
    className: 'nav-link',
})`
`;

// -----------------------------------------------------------------
// NavbarToggler component
// -----------------------------------------------------------------
const NavbarToggler = ({target}) => (
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target={target}>
        <span className="navbar-toggler-icon"></span>
    </button>
)

// -----------------------------------------------------------------
// NavbarCollapse component
// -----------------------------------------------------------------
const NavbarCollapse = ({id, children}) => (
    <div className="collapse navbar-collapse flex-column" id={id}>
        {children}
    </div>
)

// -----------------------------------------------------------------
// DropdownToggle component
// -----------------------------------------------------------------
const DropdownToggle = ({children}) => (
    <a className="nav-link dropdown-toggle" data-toggle="dropdown" 
        href="#" role="button" aria-haspopup="true" aria-expanded="false">
        {children}
    </a>
)

// -----------------------------------------------------------------
// DropdownMenu component
// -----------------------------------------------------------------
const DropdownMenu = styled.div.attrs({
    className: 'dropdown-menu',
})`
`;

// -----------------------------------------------------------------
// DropdownItem component
// -----------------------------------------------------------------
const DropdownItem = styled.a.attrs({
    className: 'dropdown-item',
})`
`;

// -----------------------------------------------------------------
// DropdownDivider component
// -----------------------------------------------------------------
const DropdownDivider = () => (
    <div className="dropdown-divider"></div>
)

// -----------------------------------------------------------------
// Router Link component
// -----------------------------------------------------------------
const RouterLink = ({href, children}) => (
    <Link to={href} className='nav-link'>{children}</Link>
)

import { useDispatch, useSelector } from "react-redux"
// import { logoutReqAction } from '../../actions/action.js'
import { getLogout } from '../../features/login/loginSlice'
import { useHistory } from "react-router-dom";

const NavUser = () => {
    const { userData: currentUser } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const history = useHistory();

    const LogoutCb = () => {
        console.log ("Logout user data is ", currentUser);
        if (currentUser) {
          dispatch(getLogout())
          // logoutReqAction (dispatch);
          history.push("/");
        }
    }

    return (
            <div>
                {currentUser ? (
                <div>
                    <NavItem>
                        <NavLink href="#" onClick={LogoutCb}>{currentUser.name}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={LogoutCb}>Logout</NavLink>
                    </NavItem>
                    </div>
                ) : ( <NavItem><NavLink href="#" onClick={LogoutCb}>No User</NavLink></NavItem>)
                }
            </div>
    );
}

// -----------------------------------------------------------------
// Wrapping Navbar
// -----------------------------------------------------------------
const Navbar = ({def}) => {
    const {brand, navMenu, iconMenu} = def;
    return (
        <NavbarWrap>
            <NavbarBrand href={brand.href} image={brand.image} ></NavbarBrand>
            <NavbarToggler target="#navbarCollapse" />
            <NavbarCollapse id="navbarCollapse">
                <ul className="navbar-nav">            
                    {navMenu.map((item, i) => {
                        let active = item.active ? 'active' : '';
                        if (item.submenu) {
                            return (
                                <NavItemDropdown key={'mykey' + i}>
                                    <DropdownToggle>{item.title}</DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            item.submenu.map ((sub, j) => {
                                                if (sub.divider) {
                                                    return (
                                                        <DropdownDivider key={'mysub' + j}/>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <DropdownItem key={'mysub' + j} href={sub.href}>{sub.title}</DropdownItem>
                                                    )
                                                }
                                            })
                                        }
                                    </DropdownMenu>
                                </NavItemDropdown>        
                            )                            
                        }
                        else {
                            return (
                                <NavItem className={active} key={'mykey' + i} >
                                    {/* <NavLink href={item.href}>{item.title}</NavLink> */}
                                    <RouterLink href={item.href}>{item.title}</RouterLink>
                                </NavItem>
                            )
                        }
                    })}            
                </ul>
                <form className="form-inline d-none d-lg-block">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </NavbarCollapse>
            <ul className="navbar-nav flex-row">
                <NavUser />
                <NavItem>
                    <NavLink href="#sidebarnav" data-target="#sidebarnav" data-toggle="collapse"><i className="fa fa-clock-o"></i></NavLink>
                </NavItem>
                <NavItemDropdown>
                    <DropdownToggle><i className="fa fa-facebook"></i></DropdownToggle>
                    <DropdownNotification />
                </NavItemDropdown>
                {iconMenu.map((item, j) => {
                    return (
                        <NavItem key={'mykey' + j}>
                            <NavLink href={item.href}><i className={"fa " + item.icon}></i></NavLink>
                        </NavItem>
                    )}
                )}            
            </ul>
        </NavbarWrap>
    )
}

// -----------------------------------------------------------------
// Collapsing Navbar
// -----------------------------------------------------------------
const NavbarOld = () => (
    <nav className="navbar navbar-expand-md bg-dark">
        <a className="navbar-brand" href="#">KD Brand</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
                <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="#">Features</a>
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </div>        
                <a className="nav-item nav-link disabled" href="#">Disabled</a>
            </div>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>        
    </nav>
)

const Header = () => (
    <Navbar />
)

Navbar.propTypes = {
}

export default Navbar
