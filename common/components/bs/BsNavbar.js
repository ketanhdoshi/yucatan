import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

function BsNavbar (props) {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">React-Bootstrap</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#">Link</NavItem>
                    <NavItem eventKey={2} href="#">Link</NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item eventKey={3.1}>Action</NavDropdown.Item>
                        <NavDropdown.Item eventKey={3.2}>Another action</NavDropdown.Item>
                        <NavDropdown.Item eventKey={3.3}>Something else here</NavDropdown.Item>
                        <NavDropdown.Item divider />
                        <NavDropdown.Item eventKey={3.3}>Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Link Right</NavItem>
                    <NavItem eventKey={2} href="#">Link Right</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  );
}

export default BsNavbar;