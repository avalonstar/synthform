import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { channel } from 'configurations/constants';
import { setAndHandleSubPointListener } from 'modules/subscriptions';

const defaultProps = {
  subPoints: 0
};
const propTypes = {
  subPoints: PropTypes.number,
  setAndHandleSubPointListener: PropTypes.func.isRequired
};

class SubPointGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 300
    };
  }

  componentDidMount() {
    this.props.setAndHandleSubPointListener(channel);
  }

  render() {
    return (
      <div className="spg">
        {this.props.subPoints}/{this.state.goal}
      </div>
    );
  }
}

SubPointGoal.defaultProps = defaultProps;
SubPointGoal.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isFetching: state.subscriptions.get('isFetchingSubPoints'),
    error: state.subscriptions.get('error'),
    subPoints: state.subscriptions.get('subPoints')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAndHandleSubPointListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPointGoal);
