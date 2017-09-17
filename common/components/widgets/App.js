// -----------------------------------------------------------------
// Top level App component - may not be necessary
// -----------------------------------------------------------------

import React, { PropTypes } from 'react'

const App = (props) => (
        <div>
            {props.children}
        </div>
)

App.propTypes = {
}

export default App
