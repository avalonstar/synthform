import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { eventFetch, eventNotifier } from 'actions/events';
import * as selectors from './selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  debugMode: PropTypes.bool,
  request: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

const defaultProps = {
  debugMode: false
};

class EventProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user, this.props.debugMode);
  }

  onComplete = () => {
    console.log('event deleted');
    this.props.deleteEventFromNotifier();
  };

  render() {
    return this.props.children(this.props, this.onComplete);
  }
}

EventProvider.propTypes = propTypes;
EventProvider.defaultProps = defaultProps;

const mapStateToProps = state => ({
  notifierPool: selectors.getNotifications(state),
  payload: selectors.getEvents(state)
});

const mapDispatchToProps = dispatch => ({
  request: (user, debugMode) => dispatch(eventFetch.request(user, debugMode)),
  deleteEventFromNotifier: () => dispatch(eventNotifier.delete())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventProvider);
