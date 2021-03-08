// -----------------------------------------------------------------
// Container component for the example Shortlist page
// Written as an example during the initial Redux experimentation.
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
/* import { connect } from 'react-redux'
import ShortlistView from '../screens/ShortlistView'

const dummyClick = (filter) => {
    return "dummy Click"
}

const mapStateToProps = (state, ownprops) => ({
   ,
})

const mapDispatchToProps =  ({
  onDummyClick: dummyClick
})

const ShortlistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortlistView)

export default ShortlistContainer */

// -----------------------------------------------------------------
// Shortlist page - Written as an example during the initial Redux experimentation.
// !!!!!!!! Should be cleaned up and re-written 
// -----------------------------------------------------------------
import React from 'react'

const ShortlistView = () => {
  const first = "my stuff"

  return (
    <div>
      Shortlist
      {first}
    </div>
  )
}

export default ShortlistView
