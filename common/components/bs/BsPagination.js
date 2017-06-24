import React from 'react';
import { Pagination } from 'react-bootstrap';

const BsPagination = React.createClass({
  getInitialState() {
    return {
      activePage: 1
    };
  },

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  },

  render() {
    return (
       <Pagination
          bsSize="medium"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
    );
  }
});


export default BsPagination;