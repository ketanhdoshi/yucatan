// -----------------------------------------------------------------
// Presentational component for the UI Components - Form page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import Box, {BOX_INFO} from './widgets/Box'
import FormText from './widgets/FormText'

// -----------------------------------------------------------------
// This component constructs the overall page. It is not meant to be
// a reusable widget, but an orchestrator for the widgets on this
// page.
// -----------------------------------------------------------------
const UiFormView = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Box bg={BOX_INFO} title="My Forms">
                        <p>This is my form</p>
                        <form role="form">                
                            <FormText type="email" label="Email" placeholder="Type Email..." />
                            <FormText type="password" label="Pwd" placeholder="Type Pwd..." />
                            <FormText label="Kd Lab1" placeholder="Type..." />
                            <FormText label="KD Label" placeholder="KD Place..." />
                        </form>
                    </Box>
                </div> {/* /.col */} 
            </div>
        </div>
    )
}

UiFormView.propTypes = {
}

export default UiFormView