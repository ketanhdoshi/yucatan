// -----------------------------------------------------------------
// Top level container component for the entire application
// It has no UI and is a place holder for any application-wide logic
// -----------------------------------------------------------------

/* import { connect } from 'react-redux'
import AppView from '../screens/AppView'

const dummyClick = (filter) => {
    return "dummy Click"
}

const mapStateToProps = (state, ownprops) => ({
   first: "great",
   children: ownprops.children
})

const mapDispatchToProps =  ({
  onDummyClick: dummyClick
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default AppContainer */

// -----------------------------------------------------------------
// Top level presentation component for the entire application
// It is largely a placeholder and should not contain any UI of its own
// -----------------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle }  from 'styled-components';

import MainContainer from './MainContainer'
import Home from '../screens/Home'
import { LoginContainer } from './LoginContainer'

/* TODO - temporarily hardcoded only for testing */
const GlobalStyle = createGlobalStyle`
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
//  !!!!!!!!! Does the GlobalStyle go inside the div???
// -----------------------------------------------------------------
const AppContainer = () => {
  const { userData: currentUser } = useSelector((state) => state.login);
  console.log ("App Container current user is ", currentUser);

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={LoginContainer}/>
                <Route exact path="/">
                  {currentUser ? <MainContainer /> : <Home />}
                </Route>
                <Route>
                  {currentUser ? 
                    <MainContainer /> : 
                    <Redirect to={{ pathname: "/login", state: { from: location }}} />
                  }
                </Route>
            </Switch>
        </div>
    </ThemeProvider>
  );
}

export default AppContainer