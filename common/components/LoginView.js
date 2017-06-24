// -----------------------------------------------------------------
// Presentational component for Login page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

const LoginView = (user, name, onDummyClick) => (
  <div>  
      Login
  </div>
)

LoginView.propTypes = {
    user: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onDummyClick: PropTypes.func.isRequired
}

export default LoginView
