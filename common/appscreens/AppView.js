// -----------------------------------------------------------------
// Top level presentation component for the entire application
// It is largely a placeholder for any application-wide logic and 
// should not contain any UI of its own
// -----------------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle }  from 'styled-components';

import MainView from '../layout/lte/MainView'
import AdminLayout from "../layout/admin/Admin";
import MainPage from "../layout/main/MainPage";
import Home from './Home'
import { LoginView } from './LoginView'

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

// Polished is an add-on for Styled Components and provides a lot of Sass-style mixins
// and helper functions in Javascript
import { lighten } from 'polished'
const base = {
  newBlue:           '#1DC7EA',
  newDarkBlue:       '#1F77D0',
  newGreen:          '#87CB16',
  newRed:            '#FB404B',
  newOrange:         '#FFA534',
};
const theme = {
  primary:           'palevioletred',
  colour: {
    darkGray:          '#9A9A9A',
    mediumDarkGray:    '#AAAAAA',
    lightGray:         '#E3E3E3',
    whiteColour:       '#FFFFFF',
    blackColor:        '#333333',
    infoColour:        '#1DC7EA',
    defaultColour:     '#888888',
    transparentBg:     'transparent',
    whiteBg:           '#FFFFFF',
    azureNavbar:       lighten(0.15, base.newBlue),
    blueNavbar:        lighten(0.1, base.newDarkBlue),
    greenNavbar:       lighten(0.1, base.newGreen),
    orangeNavbar:      lighten(0.1, base.newOrange),
    redNavbar:         lighten(0.1, base.newRed),
  },
  font: {
    fontSizeBase:      '14px',
    fontSizeMedium:    '16px',
    fontSizeSmall:     '12px',
    fontWeightNormal:  400,
    fontWeightLight:   300,
  },
  layout: {
    paddingBaseVertical:  '8px',
    borderRadiusBase:  '4px',
  },
  none:                 0,
};

// -----------------------------------------------------------------
// Every route in the app must be inside the AppContainer
// TODO - Implement an isLoggedIn check and go to MainContainer if
//  logged in and LoginContainer if not. Remove the Switch
//  !!!!!!!!! Does the GlobalStyle go inside the div???
// -----------------------------------------------------------------
const AppView = () => {
  const { userData: currentUser } = useSelector((state) => state.login);
  const location = useLocation();
  console.log ("App View current user is ", currentUser);

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/main" render={(props) => <MainPage {...props} />} />
                <Route path="/home" component={Home}/>
                <Route path="/login" component={LoginView}/>
                <Route exact path="/">
                  {currentUser ? <MainView /> : <Home />}
                </Route>
                <Route>
                  {currentUser ? 
                    <MainView /> : 
                    <Redirect to={{ pathname: "/login", state: { from: location }}} />
                  }
                </Route>
            </Switch>
        </div>
    </ThemeProvider>
  );
}

export default AppView