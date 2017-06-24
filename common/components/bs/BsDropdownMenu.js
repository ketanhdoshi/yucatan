import React from 'react';
import { Button, ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap';

function BsDropdownMenu(props) {
  return (
      <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  );
}

const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title, i) {
  return (
    <SplitButton bsStyle={title.toLowerCase()} title={title} key={i} id={`split-button-basic-${i}`}>
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </SplitButton>
  );
}

export default BsDropdownMenu;