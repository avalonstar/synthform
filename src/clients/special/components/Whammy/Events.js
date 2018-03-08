import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  payload: PropTypes.arrayOf(PropTypes.object).isRequired
};

class Events extends Component {
  render() {
    return (
      <div style={{ display: 'none' }}>
        {JSON.stringify(this.props.payload)}
      </div>
    );
  }
}

Events.propTypes = propTypes;

export default Events;
