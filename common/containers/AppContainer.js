// -----------------------------------------------------------------
// Top level container component for the entire application
// It has no UI and is a place holder for any application-wide logic
// -----------------------------------------------------------------

import { connect } from 'react-redux'
import AppView from '../components/AppView'

const dummyClick = (filter) => {
    return "dummy Click"
}

const mapStateToProps = (state, ownprops) => ({
   first: "great",
   children: ownprops.children
})

const mapDispatchToProps =  ({
  onDummyClick: dummyClick
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default AppContainer
