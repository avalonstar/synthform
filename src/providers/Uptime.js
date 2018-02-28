import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uptimeFetch } from 'actions/uptime';
import * as selectors from 'selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

class UptimeProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user);
  }

  render() {
    return this.props.children(this.props);
  }
}

UptimeProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  payload: selectors.getStreamStartTime(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(uptimeFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UptimeProvider);
