import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import * as messageActionCreators from 'redux/modules/messages';

const propTypes = {
  channel: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List)
};

class Chat extends Component {
  render() {
    return <div />;
  }
}

Chat.propTypes = propTypes;

function mapStateToProps({ messages }, props) {
  const channelMessages = messages.get(props.channel);
  return {
    isFetching: messages.get('isFetching'),
    error: messages.get('error'),
    messages: channelMessages ? channelMessages.get('messages') : List()
  };
}

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(messageActionCreators, dispatch)
)(Chat);
