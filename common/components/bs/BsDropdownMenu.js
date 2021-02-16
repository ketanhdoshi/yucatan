import React from 'react';
import { Button, ButtonToolbar, SplitButton, Dropdown } from 'react-bootstrap';

function BsDropdownMenu(props) {
  return (
      <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  );
}

const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title, i) {
  return (
    <SplitButton bsStyle={title.toLowerCase()} title={title} key={i} id={`split-button-basic-${i}`}>
      <Dropdown.Item eventKey="1">Action</Dropdown.Item>
      <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
      <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </SplitButton>
  );
}

export default BsDropdownMenu;