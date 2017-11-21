import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChatMessage.css';

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
      <li className="cm">
        <div className="cm-badges" />
        <Message message={this.props.message} />
        <Username
          displayName={this.props.displayName}
          username={this.props.username}
          color={this.props.color}
        />
      </li>
    );
  }
}

ChatMessage.propTypes = propTypes;
ChatMessage.defaultProps = defaultProps;
Message.propTypes = messagePropTypes;
Username.propTypes = usernamePropTypes;

export default ChatMessage;
