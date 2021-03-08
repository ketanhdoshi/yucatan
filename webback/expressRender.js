import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import configureStore from '../common/store/configureStore'
import AppView from '../common/appscreens/AppView'  
//import configureStore from '../minimal/store/configureStore'
//import AppContainer from '../minimal/containers/AppContainer'  

function srvRender(request, res) {
    if (request.originalUrl == "/favicon.ico") {
        console.log ("ignoring favicon.ico")
        res.status(404)
        return
    }

    console.info ('here it is ', request.originalUrl)

    // Compile an initial state and create a new Redux store instance
    const preloadedState = { }
    const store = configureStore(preloadedState)

    const context = {}
    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={request.originalUrl} context={context}>
                <AppView />
            </StaticRouter>
        </Provider>
    )
    
    if (context.url) {
        // We received a redirect
        console.info ('redirect', context.url)
        return res.status(302).redirect(context.url)
    }
    else {
        // Grab the initial state from our Redux store
        const finalState = store.getState()

        console.info ('rendered ', html)

        // Send the rendered page back to the client
        // Use the html template in file 'index.ejs'
        // The React rendered output replaces the %html% tag
        // in the template
        res.status(200).render('index', {
            html: html, 
            state: JSON.stringify(finalState).replace(/</g, '\\x3c')
        });
    }
}

export default srvRender