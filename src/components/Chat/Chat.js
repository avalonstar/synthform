import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';

import { messageFetch } from 'actions/messages';

import ChatMessage from './ChatMessage';

const propTypes = {
  messages: PropTypes.array,
  request: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const defaultProps = {
  messages: []
};

const Wrapper = styled.ul`
  display: grid;

  list-style: none;
  margin: 0;
  padding: 0;
`;

class Chat extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return (
      <Wrapper className={this.props.className}>
        {this.props.messages.map(data => (
          <ChatMessage key={data.timestamp} {...data} />
        ))}
      </Wrapper>
    );
  }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    messages: state.messages.messages
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
