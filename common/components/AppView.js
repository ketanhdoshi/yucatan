// -----------------------------------------------------------------
// Top level presentation component for the entire application
// It is largely a placeholder and should not contain any UI of its own
// -----------------------------------------------------------------

import React, { PropTypes } from 'react'
import { ThemeProvider }  from 'styled-components';

const theme = {
  primary: 'palevioletred',
};

const AppView = ({ first, children, onDummyClick }) => (
    <ThemeProvider theme={theme}>
        <div>
            {children}
        </div>
    </ThemeProvider>
)

AppView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default AppView
