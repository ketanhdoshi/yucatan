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

  return store
}

export default configureStore
