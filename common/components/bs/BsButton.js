import React from 'react';
import { Button } from 'react-bootstrap';

function BsButton (props) {
    return (
        <Button bsStyle="primary">{props.text}</Button>
    )
}


export default BsButton;