import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { channel } from 'configurations/constants';
import { setAndHandleMessageListener } from 'modules/messages';
import ChatMessage from './ChatMessage';

import './Chat.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  messages: PropTypes.instanceOf(List),
  setAndHandleMessageListener: PropTypes.func.isRequired
};

const defaultProps = {
  messages: List()
};

class Chat extends Component {
  componentDidMount() {
    this.props.setAndHandleMessageListener(channel);
  }

  render() {
    return (
      <ul className="c">
        {this.props.messages.map(data =>
          <ChatMessage key={data.get('timestamp')} {...data.toJS()} />
        )}
      </ul>
    );
  }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isFetching: state.messages.get('isFetching'),
    messages: state.messages.get('messages')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAndHandleMessageListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
