import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import { getRoutes } from '../common/routes/routes'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

console.log ("preload ", preloadedState)

render(
    <Provider store={store}>
        { getRoutes (store) }
     </Provider>,
    rootElement
)
