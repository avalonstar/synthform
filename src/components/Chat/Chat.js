import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { messageFetch } from 'actions/messages';
import ChatMessage from './ChatMessage';

import './Chat.css';

const propTypes = {
  messages: PropTypes.instanceOf(List),
  request: PropTypes.func.isRequired
};

const defaultProps = {
  messages: List()
};

class Chat extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return (
      <ul className="c">
        {this.props.messages.map(data => (
          <ChatMessage key={data.get('timestamp')} {...data.toJS()} />
        ))}
      </ul>
    );
  }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    messages: state.messages.get('messages')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(messageFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
