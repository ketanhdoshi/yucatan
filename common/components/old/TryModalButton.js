// -----------------------------------------------------------------
// Experiment to show Bootstrap modal popups in a React friendly
// manner. These are not Redux components and will not be used.
// Instead we will likely use the React-Bootstrap components
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

var TryModalButton = React.createClass({
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
            <button type="button" className="btn btn-primary" onClick={this.openModal}>
                Try Modal
            </button>

            <TryMyModal isOpen={this.state.isModalOpen} closeCB={this.closeModal}/>
          </div>
        );
    }
});

const TryMyModal = React.createClass({

    componentWillUpdate: function (nextProps, nextState) {    
        var modalNode = $(ReactDOM.findDOMNode(this))
        if (!nextProps.isOpen && modalNode) {
            console.log ("going to update...", modalNode)
            modalNode.modal('hide')
        }
    },
    componentDidUpdate: function () {    
        var modalNode = $(ReactDOM.findDOMNode(this))
        console.log ("updated...", modalNode)
        if (modalNode) {
            modalNode.modal()
        }
    },
  

    render: function() {
        if(this.props.isOpen){
            return (
                <div id="tryMyModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">

                     <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.closeCB}>&times;</button>
                        <h4 className="modal-title">Modal Header</h4>
                      </div>
                      <div className="modal-body">
                        <p>Some text in the modal.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.props.closeCB}>Close</button>
                      </div>
                    </div>

                  </div>
                </div>
            )
        } else {
            return null;
        }
    }
});

export default TryModalButton
