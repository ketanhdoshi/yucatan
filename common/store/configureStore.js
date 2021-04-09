import { createStore, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// For Redux DevTools
import { devToolsEnhancer } from 'redux-devtools-extension';
//import thunk from 'redux-thunk'
import rootReducer from '../reducers'

/* const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    // preloadedState, // Comment out since we're using devToolsEnhancer
    devToolsEnhancer(),
    //applyMiddleware(thunk)
  )

  return store
}

export default configureStore */


const configureAppStore = (preloadedState) => {
  // Redux Toolkit's configureStore() by default handles applying of async middleware
  // and enabling the Redux Devtools extension
  const store = configureStore({
    reducer: rootReducer
  })

  if (module.hot) {
    // Accept the Hot Module reload of code for my Redux reducers. This has to be done
    // in addition to accepting the code for the React components (which is done inside
    // the client.js )
    console.log ('in configure store hot');
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureAppStore