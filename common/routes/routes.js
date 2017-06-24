// -----------------------------------------------------------------
// Common routes for both client and server-side
// -----------------------------------------------------------------

import React from 'react'
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, createMemoryHistory } from 'react-router'

import Dashboard1 from '../components/Dashboard1'
import Dashboard2 from '../components/Dashboard2'
import Home from '../components/Home'
import AppContainer from '../containers/AppContainer'
import MainContainer from '../containers/MainContainer'
import { PropertiesContainer } from '../containers/PropertiesContainer'
import { MatchesContainer, getMatches } from '../containers/MatchesContainer'
import PaymentView from '../components/PaymentView'
import ModalView from '../components/ModalView'
import ShortlistContainer from '../containers/ShortlistContainer'
import LoginContainer from '../containers/LoginContainer'
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
