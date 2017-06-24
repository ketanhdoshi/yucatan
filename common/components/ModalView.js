// -----------------------------------------------------------------
// Experiment to show Bootstrap modal popups in a React friendly
// manner. These are not Redux components and will not be used.
// Instead we will likely use the React-Bootstrap components
// -----------------------------------------------------------------
import React from 'react'
import ModalButton from '../components/old/ModalButton'
import TryModalButton from '../components/old/TryModalButton'
import NewModalButton from '../components/old/NewModalButton'

const ModalView = () => (
    <div>
        <ModalButton />

        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#dtModal">Data Target Modal</button>
        <DataTargetModal />

        <button type="button" className="btn btn-info" id="jsBtn" onClick={showJsModal}>JS Modal</button>
        <JSTargetModal />

        <TryModalButton />

        <NewModalButton />
        <NewModalButton />
        <NewModalButton />

    </div>
)

function showJsModal () {
    $("#jsModal").modal()
}

const DataTargetModal = React.createClass({
    
    render: function() {
            return (
                <div id="dtModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">

                     <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Modal Header</h4>
                      </div>
                      <div className="modal-body">
                        <p>Some text in the modal.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
                </div>
            )
    }
});

const JSTargetModal = React.createClass({
    
    render: function() {
            return (
                <div id="jsModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">

                     <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Modal Header</h4>
                      </div>
                      <div className="modal-body">
                        <p>Some text in the modal.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
                </div>
            )
    }
});


export default ModalView
