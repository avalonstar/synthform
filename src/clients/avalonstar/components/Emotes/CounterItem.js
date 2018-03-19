import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';
import numeral from 'numeral';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

class Counter extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.count !== this.props.count;
  }

  render() {
    return (
      <Item>
        <Emote
          src={`//static-cdn.jtvnw.net/emoticons/v1/${this.props.id}/3.0`}
          alt={this.props.code}
        />
        <Count>
          <AnimatedNumber
            value={this.props.count}
            duration={500}
            formatValue={n => numeral(n).format('0,0')}
          />
        </Count>
      </Item>
    );
  }
}

Counter.propTypes = propTypes;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding-top: 8px;

  font-family: ${props => props.theme.gotham};
`;

const Emote = styled.img`
  position: relative;
  z-index: 10;
  width: 56px;
`;

const Count = styled.span`
  position: relative;
  padding: 6px 12px 6px 26px;
  margin-left: -20px;
  text-align: right;

  background: ${rgba('#090a0c', 0.5)};
  box-shadow: 0 0 0 2px ${rgba('#e8ebed', 0.1)};
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export default Counter;
