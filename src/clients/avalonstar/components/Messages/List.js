import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import styled from 'styled-components';
import { rgba } from 'polished';

import Message from './Message';

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const List = props => (
  <StyledFlipMove
    typeName="ol"
    className={props.className}
    easing="cubic-bezier(.62, .28, .23, .99)"
    enterAnimation="fade"
    leaveAnimation="fade"
  >
    {props.messages.map(message => <Message ref={message.id} {...message} />)}
  </StyledFlipMove>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

const StyledFlipMove = styled(FlipMove)`
  margin: 0;
  padding: 18px;
  list-style: none;
`;

export default List;
