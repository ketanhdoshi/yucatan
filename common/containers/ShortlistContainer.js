// -----------------------------------------------------------------
// Container component for the example Shortlist page
// Written as an example during the initial Redux experimentation.
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
import { connect } from 'react-redux'
import ShortlistView from '../components/ShortlistView'

const dummyClick = (filter) => {
    return "dummy Click"
}

const mapStateToProps = (state, ownprops) => ({
   first: "my stuff",
})

const mapDispatchToProps =  ({
  onDummyClick: dummyClick
})

const ShortlistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortlistView)

export default ShortlistContainer
