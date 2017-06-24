// -----------------------------------------------------------------
// Top level presentation component for the entire application
// It is largely a placeholder and should not contain any UI of its own
// -----------------------------------------------------------------

import React, { PropTypes } from 'react'

const AppView = ({ first, children, onDummyClick }) => (
  <div>
   App
   {children}
  </div>
)

AppView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default AppView
