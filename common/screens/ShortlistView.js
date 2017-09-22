// -----------------------------------------------------------------
// Presentational component for the example Shortlist page
// Written as an example during the initial Redux experimentation.
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

const ShortlistView = ({ first, onDummyClick }) => (
  <div>
   Shortlist
   {first}
  </div>
)

ShortlistView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default ShortlistView
