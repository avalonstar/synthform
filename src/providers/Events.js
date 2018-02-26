import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { eventFetch } from 'actions/events';
import * as selectors from 'selectors';

const propTypes = {
  user: PropTypes.user.isRequired,
  debugMode: PropTypes.bool,
  request: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

const defaultProps = {
  debugMode: false
};

class EventProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user, this.props.debugMode);
  }

  render() {
    return this.props.render(...this.props);
  }
}

EventProvider.propTypes = propTypes;
EventProvider.defaultProps = defaultProps;

const mapStateToProps = state => ({
  payload: selectors.getEventList(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      request: (user, debugMode) =>
        dispatch(eventFetch.request(user, debugMode))
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventProvider);
