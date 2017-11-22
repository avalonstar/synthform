/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import './CounterItem.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

class Counter extends Component {
  render() {
    return (
      <li className="eci">
        <img
          src={`//static-cdn.jtvnw.net/emoticons/v1/${this.props.id}/2.0`}
          alt={this.props.code}
        />
        <span className="eci-count">
          {numeral(this.props.count).format('0,0')}
        </span>
      </li>
    );
  }
}

Counter.propTypes = propTypes;

export default Counter;
