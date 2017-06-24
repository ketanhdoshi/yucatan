import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const BsModal = React.createClass({
    getInitialState() {
        return {showModal: false};
    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    render() {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );    
    }
});

export default BsModal;