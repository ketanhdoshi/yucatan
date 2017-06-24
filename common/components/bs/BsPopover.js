import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

function BsPopover(props) {
    const popover = (
        <Popover id={props.id} title={props.title}>
            {props.text}
        </Popover>
    );
    return (
        <OverlayTrigger overlay={popover}><a href="#">{props.children}</a></OverlayTrigger>
    );
}

export default BsPopover;