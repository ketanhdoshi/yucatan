// -----------------------------------------------------------------
// Presentational component for the Header
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

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
    background-image: url(https://genesisui.com/demo/clever/bootstrap4-react/img/logo.5a69406456e16136660db1c6119ab2bb.png);
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
// Wrapping Navbar
// -----------------------------------------------------------------
const Navbar = () => (
    <NavbarWrap>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler target="#navbarCollapse" />
        <NavbarCollapse id="navbarCollapse">
            <ul className="navbar-nav">
                <NavItem className="active">
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Product</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Shop</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">About</NavLink>
                </NavItem>
                <NavItemDropdown>
                    <DropdownToggle>Drop Menu</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href="#">Action</DropdownItem>
                        <DropdownItem href="#">Another action</DropdownItem>
                        <DropdownItem href="#">Something else here</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="#">Separated link</DropdownItem>
                    </DropdownMenu>
                </NavItemDropdown>        
                <NavItem>
                    <NavLink href="#">Events</NavLink>
                </NavItem>
            </ul>
            <form className="form-inline d-none d-lg-block">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </NavbarCollapse>
        <ul className="navbar-nav flex-row">
            <NavItem>
                <NavLink href="#sidebarnav" data-target="#sidebarnav" data-toggle="collapse"><i className="fa fa-clock-o"></i></NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#"><i className="fa fa-facebook"></i></NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#"><i className="fa fa-instagram"></i></NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#"><i className="fa fa-twitter"></i></NavLink>
            </NavItem>
        </ul>
    </NavbarWrap>
)

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

Header.propTypes = {
}

export default Header
