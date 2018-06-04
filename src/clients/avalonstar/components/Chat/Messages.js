import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import styled from 'styled-components';

import Message from './Message';

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

class Messages extends Component {
  render() {
    return (
      <StyledFlipMove
        typeName="ol"
        className={this.props.className}
        easing="cubic-bezier(.62, .28, .23, .99)"
        enterAnimation="fade"
        leaveAnimation="fade"
        staggerDurationBy={100}
      >
        {this.props.messages.map(message => <Message {...message} />)}
      </StyledFlipMove>
    );
  }
}

Messages.propTypes = propTypes;
Messages.defaultProps = defaultProps;

const StyledFlipMove = styled(FlipMove)`
  margin: 0;
  padding: 0;

  list-style: none;
`;

export default Messages;
