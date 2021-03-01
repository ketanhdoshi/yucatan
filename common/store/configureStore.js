import { createStore, applyMiddleware } from 'redux'
// For Redux DevTools
import { devToolsEnhancer } from 'redux-devtools-extension';
//import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    // preloadedState, // Comment out since we're using devToolsEnhancer
    devToolsEnhancer(),
    //applyMiddleware(thunk)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
