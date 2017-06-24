import React from 'react';
import { Panel } from 'react-bootstrap';

const BsPanel = (props) => (
    <div>
        <Panel header={<h3>{props.title}</h3>}>
            {props.content}
        </Panel>
    </div>
)

export default BsPanel;