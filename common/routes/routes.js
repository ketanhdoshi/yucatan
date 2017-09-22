// -----------------------------------------------------------------
// Common routes for both client and server-side
// -----------------------------------------------------------------

import React from 'react'
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, createMemoryHistory } from 'react-router'

import AppContainer from '../containers/AppContainer'
import MainContainer from '../containers/MainContainer'
import { PropertiesContainer } from '../containers/PropertiesContainer'
import { MatchesContainer, getMatches } from '../containers/MatchesContainer'
import ShortlistContainer from '../containers/ShortlistContainer'
import LoginContainer from '../containers/LoginContainer'

import Home from '../screens/Home'
import Dashboard1 from '../screens/Dashboard1'
import Dashboard2 from '../screens/Dashboard2'
import UiButtonView from '../screens/UiButtonView'
import UiGeneralView from '../screens/UiGeneralView'
import UiFormView from '../screens/UiFormView'
import PaymentView from '../screens/PaymentView'

import GoogleMaps from '../components/widgets/GoogleMaps'
import CalendarView from '../components/widgets/CalendarView'

import ModalView from '../components/old/ModalView'
import BsView from '../components/bs/BsView';

var history;
if (typeof(window) !== 'undefined'){
    // Use this history on the client
    history = browserHistory;
}
else {
    // Use this history for server-side rendering
    history = createMemoryHistory();
}

export const getRoutes = (store) => {
    return (
        <Router history={history}>
            {/* Every route in the app must be inside the AppContainer */}
            <Route path="/" component={AppContainer}>
                {/* Root path redirects to the home page */}
                <IndexRedirect to="/home" />
                {/* All logged-in routes must be inside MainContainer */}
                <Route component={MainContainer}>
                    <Route path="/home" component={Home}/>
                    <Route path="/dashboard1" component={Dashboard1}/>
                    <Route path="/dashboard2" component={Dashboard2}/>
                    <Route path="/ui/button" component={UiButtonView}/>
                    <Route path="/ui/general" component={UiGeneralView}/>
                    <Route path="/ui/form" component={UiFormView}/>
                    <Route path="/googlemaps" component={GoogleMaps}/>                    
                    <Route path="/calendar" component={CalendarView}/>
                    <Route path="/bsview" component={BsView}/>
                    <Route path="/matches" component={MatchesContainer} onEnter={getMatches(store)}/>
                    <Route path="/properties" component={PropertiesContainer}/>
                    <Route path="/shortlist" component={ShortlistContainer}/>
                    <Route path="/payment" component={PaymentView}/>
                    <Route path="/modals" component={ModalView}/>
                </Route>
                {/* These are the non-logged-in pages */}
                <Route path="/login" component={LoginContainer}/>
            </Route>
        </Router>
    )
}
