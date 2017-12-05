/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import styled from 'styled-components';

const propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

const Item = styled.li`
  display: flex;
  align-items: center;
  padding-top: 8px;

  font-family: 'Gotham SSm A', 'Gotham SSm B';

  img {
    position: relative;
    z-index: 10;
  }
`;

const Count = styled.span`
  position: relative;
  padding: 6px 12px 6px 26px;
  margin-left: -20px;

  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

class Counter extends Component {
  render() {
    return (
      <Item>
        <img
          src={`//static-cdn.jtvnw.net/emoticons/v1/${this.props.id}/2.0`}
          alt={this.props.code}
        />
        <Count>{numeral(this.props.count).format('0,0')}</Count>
      </Item>
    );
  }
}

Counter.propTypes = propTypes;

export default Counter;
