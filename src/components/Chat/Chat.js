import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import * as messageActionCreators from 'modules/messages';
import { default as ChatMessage } from './ChatMessage';

import './Chat.css';

const propTypes = {
  channel: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List)
};

class Chat extends Component {
  render() {
    return (
      <div className="c">
        {this.props.messages.map(data => {
          return <ChatMessage key={data.get('timestamp')} {...data.toJS()} />;
        })}
      </div>
    );
  }
}

Chat.propTypes = propTypes;

function mapStateToProps(state, props) {
  const messages = state.messages.get(props.channel);
  return {
    isFetching: state.messages.get('isFetching'),
    error: state.messages.get('error'),
    messages: messages ? messages.get('messages') : List()
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ messageActionCreators });
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
