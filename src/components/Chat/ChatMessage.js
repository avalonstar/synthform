import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  badges: PropTypes.shape({
    bits: PropTypes.string,
    moderator: PropTypes.string,
    subscriber: PropTypes.string
  }),
  color: PropTypes.string,
  displayName: PropTypes.string,
  isAction: PropTypes.bool.isRequired,
  message: PropTypes.string,
  mod: PropTypes.bool,
  role: PropTypes.string,
  subscriber: PropTypes.bool,
  turbo: PropTypes.bool,
  username: PropTypes.string.isRequired
};

const defaultProps = {
  message: ''
};

const messagePropTypes = {
  message: PropTypes.string.isRequired
};

const usernamePropTypes = {
  displayName: PropTypes.string,
  username: PropTypes.string.isRequired,
  color: PropTypes.string
};

function formatMessage(markup) {
  return { __html: markup };
}

const Container = styled.li`
  margin-top: 12px;
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(#090a0c, 0.12), 0 1px 2px rgba(#090a0c, 0.24);

  .cm-username {
    display: flex;
    align-items: baseline;
    padding: 12px 18px;
    border-top: 1px solid #dce0e5;
    background: #e8ebed;
    color: #607080;
    font-family: $font-forza;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
  }

  .cm-message {
    padding: 16px;

    background: linear-gradient(#2c333a, #23292f);
    color: #fff;
    font-family: $font-whitney;
    font-size: 14px;

    & > img {
      display: inline-block;
      vertical-align: middle;
      width: 28px;
    }
  }
`;

const Message = ({ message }) => (
  <div
    className="cm-message"
    dangerouslySetInnerHTML={formatMessage(message)}
  />
);

const Username = ({ displayName, username, color }) => {
  const name = displayName || username;
  return (
    <div className="cm-username" style={{ color: color }}>
      {name}
    </div>
  );
};

class ChatMessage extends Component {
  render() {
    return (
      <Container>
        <div className="cm-badges" />
        <Message message={this.props.message} />
        <Username
          displayName={this.props.displayName}
          username={this.props.username}
          color={this.props.color}
        />
      </Container>
    );
  }
}

ChatMessage.propTypes = propTypes;
ChatMessage.defaultProps = defaultProps;
Message.propTypes = messagePropTypes;
Username.propTypes = usernamePropTypes;

export default ChatMessage;
