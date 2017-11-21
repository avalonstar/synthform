/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CounterItem.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

class Counter extends Component {
  render() {
    return (
      <li>
        <img
          src={`//static-cdn.jtvnw.net/emoticons/v1/${this.props.id}/2.0`}
          alt={this.props.code}
        />
        {this.props.count}
      </li>
    );
  }
}

Counter.propTypes = propTypes;

export default Counter;
