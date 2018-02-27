import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { eventFetch } from 'actions/events';
import * as selectors from 'selectors';

const propTypes = {
  debugMode: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

const defaultProps = {
  debugMode: false,
  payload: []
};

class EventProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user, this.props.debugMode);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    return this.props.children(this.props.payload);
  }
}

EventProvider.propTypes = propTypes;
EventProvider.defaultProps = defaultProps;

const mapStateToProps = (state, { selector = selectors.getEventList }) => ({
  payload: selector(state)
});

const mapDispatchToProps = dispatch => ({
  request: (user, debugMode) => dispatch(eventFetch.request(user, debugMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventProvider);
