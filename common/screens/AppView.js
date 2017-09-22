// -----------------------------------------------------------------
// Top level presentation component for the entire application
// It is largely a placeholder and should not contain any UI of its own
// -----------------------------------------------------------------

import React, { PropTypes } from 'react'
import { ThemeProvider }  from 'styled-components';

import { injectGlobal } from 'styled-components';

/* TODO - temporarily hardcoded only for testing */
injectGlobal`
    @font-face {
        font-family: 'Source Sans Pro';
        src: url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic');
    }

    body {
        height: 100%;
    }
`;

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
