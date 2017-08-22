import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as goalActionCreators from 'modules/goals';

class SubPointGoal extends Component {
  render() {
    return (
      <div className="spg">
        {this.props.subPoints}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.goals.get('isFetchingSubPoints'),
    error: state.goals.get('error'),
    subPoints: state.goals.get('subPoints')
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ goalActionCreators });
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPointGoal);
