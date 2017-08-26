import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { channel } from 'configurations/constants';
import { setAndHandleSubCountListener } from 'modules/subscriptions';

const propTypes = {
  subCount: PropTypes.number,
  setAndHandleSubCountListener: PropTypes.func.isRequired
};

const defaultProps = {
  subPoints: 0
};

class SubCountGoal extends Component {
  componentDidMount() {
    this.props.setAndHandleSubCountListener(channel);
  }

  render() {
    return (
      <div>
        {this.props.subCount}
      </div>
    );
  }
}

SubCountGoal.defaultProps = defaultProps;
SubCountGoal.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isFetching: state.subscriptions.get('isFetchingSubCount'),
    error: state.subscriptions.get('error'),
    subPoints: state.subscriptions.get('subCount')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAndHandleSubCountListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCountGoal);
