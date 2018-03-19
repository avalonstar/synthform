import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import styled from 'styled-components';

import CounterItem from './CounterItem';

const propTypes = {
  emotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  limit: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired
};

const Counter = props => (
  <StyledFlipMove
    typeName="ol"
    className={props.className}
    easing="cubic-bezier(.62, .28, .23, .99)"
    enterAnimation="fade"
    staggerDurationBy={100}
  >
    {props.emotes
      .slice(0, props.limit)
      .map(emoteData => <CounterItem {...emoteData} code={emoteData.key} />)}
  </StyledFlipMove>
);

Counter.propTypes = propTypes;

const StyledFlipMove = styled(FlipMove)`
  margin: 0;
  padding: 0 12px;

  list-style: none;

  display: flex;
  justify-content: space-between;
`;

export default Counter;
