import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { rpgmFetch } from 'actions/special/rpgm';
import * as selectors from './selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired
};

class RPGMProvider extends Component {
  componentDidMount() {
    this.props.request('avalonstar');
  }

  render() {
    return this.props.children(this.props);
  }
}

RPGMProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  cheers: selectors.getRpgmCheers(state),
  notifierPool: selectors.getRpgmNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(rpgmFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RPGMProvider);
