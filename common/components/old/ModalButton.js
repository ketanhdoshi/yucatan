// -----------------------------------------------------------------
// Experiment to show Bootstrap modal popups in a React friendly
// manner. These are not Redux components and will not be used.
// Instead we will likely use the React-Bootstrap components
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import Modal from './Modal'

class ModalButton extends React.Component{
    getInitialState() {
        return { isModalOpen: false };
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
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
};

export default ModalButton
