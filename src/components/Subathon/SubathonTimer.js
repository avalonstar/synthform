import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { PlusSquare, ChevronRight } from 'react-feather';

import { subathonFetch } from 'actions/subathon';
import * as selectors from 'selectors';

import { CountdownTimer as Timer } from 'components/Timers';

import './CountdownTimer.css';

const propTypes = {
  active: PropTypes.bool,
  addedMinutes: PropTypes.number,
  events: PropTypes.instanceOf(List),
  contributions: PropTypes.bool,
  endTime: PropTypes.number,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  active: false,
  addedMinutes: 0,
  events: List(),
  contributions: false,
  endTime: null
};

class SubathonTimer extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return this.props.endTime ? (
      <div className="cdt">
        <span className="cdt-text">
          <ChevronRight color="#02fa7b" size={18} />
          {'!subathon'}
        </span>
        <Timer endTime={this.props.endTime} />
        <PlusSquare size={26} />
        {this.props.addedMinutes}
      </div>
    ) : (
      <div />
    );
  }
}

SubathonTimer.propTypes = propTypes;
SubathonTimer.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    active: selectors.getSubathonState(state),
    addedMinutes: selectors.getSubathonAddedMinutes(state),
    events: selectors.getNotifierPool(state),
    contributions: selectors.getSubathonContributionState(state),
    endTime: selectors.getSubathonEndTime(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(subathonFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SubathonTimer);
