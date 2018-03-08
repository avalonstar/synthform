import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { whammyFetch } from 'actions/whammy';
import * as selectors from 'selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired
};

class WhammyProvider extends Component {
  componentDidMount() {
    this.props.request('avalonstar');
  }

  render() {
    return this.props.children(this.props);
  }
}

WhammyProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  cheers: selectors.getWhammyCheers(state),
  events: selectors.getWhammyEvents(state),
  notifierPool: selectors.getWhammyNotifierPool(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(whammyFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(WhammyProvider);
