import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { madnessFetch, madnessNotifier } from 'actions/special/madness';
import * as selectors from './selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired
};

class MadnessProvider extends Component {
  componentDidMount() {
    this.props.request('avalonstar');
  }

  onComplete = () => {
    console.log('event deleted');
    this.props.deleteEventFromNotifier();
  };

  render() {
    return this.props.children(this.props, this.onComplete);
  }
}

MadnessProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  cheers: selectors.getMadnessCheers(state),
  notifierPool: selectors.getMadnessNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(madnessFetch.request(user)),
  deleteEventFromNotifier: () => dispatch(madnessNotifier.delete())
});

export default connect(mapStateToProps, mapDispatchToProps)(MadnessProvider);
