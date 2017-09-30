// -----------------------------------------------------------------
// Top level presentation component for the entire application
// It is largely a placeholder and should not contain any UI of its own
// -----------------------------------------------------------------

import React, { PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider, injectGlobal }  from 'styled-components';

import MainContainer from '../containers/MainContainer'
import LoginContainer from '../containers/LoginContainer'

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

// -----------------------------------------------------------------
// Every route in the app must be inside the AppContainer
// TODO - Implement an isLoggedIn check and go to MainContainer if
//  logged in and LoginContainer if not. Remove the Switch
// -----------------------------------------------------------------
const AppView = ({ first, children, onDummyClick }) => (
    <ThemeProvider theme={theme}>
        <div>
            <Switch>
                <Route path="/login" component={LoginContainer}/>
                <Route component={MainContainer} />
            </Switch>
        </div>
    </ThemeProvider>
)

AppView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default AppView
