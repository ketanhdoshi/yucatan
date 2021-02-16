import React from 'react';
import { Card } from 'react-bootstrap';

const BsPanel = (props) => (
    <div>
        <Card header={<h3>{props.title}</h3>}>
            {props.content}
        </Card>
    </div>
)

export default BsPanel;