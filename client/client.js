import '@babel/polyfill'
import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import AppContainer from '../common/containers/AppContainer'
//import configureStore from '../minimal/store/configureStore'
//import AppContainer from '../minimal/containers/AppContainer'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

console.log ("preload ", preloadedState)

let show = () => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </Provider>,
        rootElement
    );
};

if (module.hot) {
    console.log ('in hot');
    // Whenever a new version of App.js is available
    module.hot.accept('../common/containers/AppContainer.js', function () {
        // Require the new version and render it instead
        setTimeout(show);
        console.log ('now here ');
    })
}


/*   if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  } */

show();
