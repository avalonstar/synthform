import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { subathonFetch } from 'actions/subathon';
import * as selectors from 'selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

class SubathonProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user);
  }

  render() {
    return this.props.children(this.props);
  }
}

SubathonProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  notifierPool: selectors.getNotifierPool(state),
  payload: selectors.getSubathon(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(subathonFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubathonProvider);
