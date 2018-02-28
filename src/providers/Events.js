import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { eventFetch } from 'actions/events';
import * as selectors from 'selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  debugMode: PropTypes.bool,
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

const defaultProps = {
  debugMode: false
};

class EventProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user, this.props.debugMode);
  }

  render() {
    return this.props.children(this.props);
  }
}

EventProvider.propTypes = propTypes;
EventProvider.defaultProps = defaultProps;

const mapStateToProps = state => ({
  notifierPool: selectors.getNotifierPool(state),
  payload: selectors.getEventList(state)
});

const mapDispatchToProps = dispatch => ({
  request: (user, debugMode) => dispatch(eventFetch.request(user, debugMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventProvider);
