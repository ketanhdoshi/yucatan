import '@babel/polyfill'
import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import AppView from '../common/appscreens/AppView'
// import configureStore from '../minimal/store/configureStore'
//import AppContainer from '../minimal/containers/AppContainer'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

console.log ("preload ", preloadedState)

let show = () => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <AppView />
            </BrowserRouter>
        </Provider>,
        rootElement
    );
};

if (module.hot) {
    console.log ('in client hot');
    // Accept the Hot Module reload of code for my React components. This has to be done
    // in addition to accepting the code for the Redux components (which happens inside
    // the configureStore)
    module.hot.accept('../common/appscreens/AppView.js', function () {
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
