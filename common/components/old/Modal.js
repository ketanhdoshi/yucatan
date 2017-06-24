import React, { PropTypes } from 'react'

const Modal = React.createClass({
    
    render: function() {
        if(this.props.isOpen){
            var showstyle = {
                display: 'inline',
            };
            return (
              <div>
                <div className="modal" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={showstyle}>
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button">Super</button>
                        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div className="modal-body">
                        <h4>Text in a modal</h4>
                     </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" onClick={this.props.closeCB}>Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                 </div>
                </div>
                </div>
 
                <h5>Goody</h5>
              </div>
            );
        } else {
            return null;
        }
    }
});

export default Modal
