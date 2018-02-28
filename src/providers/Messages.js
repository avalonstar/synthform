import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { messageFetch } from 'actions/events';
import * as selectors from 'selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

class MessageProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user);
  }

  render() {
    return this.props.children(this.props);
  }
}

MessageProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  payload: selectors.getMessages(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(messageFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageProvider);
