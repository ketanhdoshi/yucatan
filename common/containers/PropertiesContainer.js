// -----------------------------------------------------------------
// React components based on Redux and React-Redux are of two types
//      1) Container components which contain all the functionality and business logic
//      2) Presentational components which contain only the display logic
//      
// Each container component is always paired with a presentational component. The
// container component fetches and prepares data and passes it to the presentational
// component to display. It also passes event callbacks to the presentational component, one
// for each user action that the presentational component supports.
// Any user actions on the display eg. a button click are then handled by the 
// presentational component by invoking the corresponding event callback. The logic for
// the event callback resides in the container component and usually results in calling
// the action helpers (which in turn may make an API call) which then call the dispatcher
// which then calls the reducers to update the store. This updated store in turn causes
// the related container component to be triggered, which calls the presentational
// component to refresh the display.
// 
// Each presentation component can include as many other presentational components as
// needed to display the UI
// -----------------------------------------------------------------
import { connect } from 'react-redux'

// Presentational component
import PropertiesView from '../components/PropertiesView'

// Action helpers
import { getPropertiesReqAction, 
         getPropertiesSuccessAction,
         getPropertiesErrorAction }
     from '../actions/action.js'

const mapStateToProps = (state, ownprops) => ({
   status: state.properties ? state.properties.api : "",
   list: state.properties ? state.properties.list : null,
})

const mapDispatchToProps = (dispatch) => ({
  onClickCb: () => { 
      getPropertiesReqAction (dispatch)
  }
})

const PropertiesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertiesView)

export {PropertiesContainer}
