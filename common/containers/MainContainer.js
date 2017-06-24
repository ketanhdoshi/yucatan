// -----------------------------------------------------------------
// Container component for all logged-in pages across the app
// -----------------------------------------------------------------
import { connect } from 'react-redux'
import MainView from '../components/MainView'

const dummyClick = (filter) => {
    return "dummy Click"
}

const mapStateToProps = (state, ownprops) => ({
   first: "KD App",
   children: ownprops.children
})

const mapDispatchToProps =  ({
  onDummyClick: dummyClick
})

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)

export default MainContainer
