import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function BsTooltip(props) {
    const tooltip = (
        <Tooltip id={props.id}>{props.text}</Tooltip>
    );  
    return (
        <OverlayTrigger overlay={tooltip} placement="top"><a href="#">{props.children}</a></OverlayTrigger>  
    );
}

export default BsTooltip;