import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { subpointFetch } from 'actions/subscriptions';
import * as selectors from 'selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

class SubPointProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user);
  }

  render() {
    return this.props.children(this.props);
  }
}

SubPointProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  payload: selectors.getSubPoints(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(subpointFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubPointProvider);
