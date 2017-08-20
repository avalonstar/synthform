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
  display_name: PropTypes.string,
  is_action: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  mod: PropTypes.bool,
  role: PropTypes.string,
  subscriber: PropTypes.bool,
  turbo: PropTypes.bool,
  username: PropTypes.string.isRequired
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

const Message = ({ message }) =>
  <div
    className="cm-message"
    dangerouslySetInnerHTML={formatMessage(message)}
  />;

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
      <div className="cm">
        <div className="cm-badges" />
        <Username
          displayName={this.props.display_name}
          username={this.props.username}
          color={this.props.color}
        />
        <Message message={this.props.message} />
      </div>
    );
  }
}

ChatMessage.propTypes = propTypes;
Message.propTypes = messagePropTypes;
Username.propTypes = usernamePropTypes;

export default ChatMessage;
