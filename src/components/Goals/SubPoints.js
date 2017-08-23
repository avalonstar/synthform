import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as subscriptionActionCreators from 'modules/subscriptions';

const propTypes = {
  subPoints: PropTypes.number.isRequired
};

class SubPointGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 300
    };
  }

  render() {
    return (
      <div className="spg">
        {this.props.subPoints}/{this.state.goal}
      </div>
    );
  }
}

SubPointGoal.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isFetching: state.subscriptions.get('isFetchingSubPoints'),
    error: state.subscriptions.get('error'),
    subPoints: state.subscriptions.get('subPoints')
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ subscriptionActionCreators });
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPointGoal);
