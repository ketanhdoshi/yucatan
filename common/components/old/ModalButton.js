// -----------------------------------------------------------------
// Experiment to show Bootstrap modal popups in a React friendly
// manner. These are not Redux components and will not be used.
// Instead we will likely use the React-Bootstrap components
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import Modal from './Modal'

var ModalButton = React.createClass({
    getInitialState: function() {
        return { isModalOpen: false };
    },

    openModal: function() {
        this.setState({ isModalOpen: true });
    },

    closeModal: function() {
        this.setState({ isModalOpen: false });
    },

    render: function() {
        return (
          <div>
            <h1>Modal demo</h1>
            
            
            <button type="button" className="btn btn-primary" onClick={this.openModal}>
                React Modal
            </button>

            <Modal isOpen={this.state.isModalOpen} closeCB={this.closeModal}/>
          </div>
        );
    }
});

export default ModalButton
