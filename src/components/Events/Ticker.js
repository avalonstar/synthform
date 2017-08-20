import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import * as eventActionCreators from 'modules/events';

const propTypes = {
  channel: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  events: PropTypes.instanceOf(List)
};

class Ticker extends Component {
  render() {
    return (
      <div className="t">
        {this.props.events.map(data => {
          return (
            <div>
              {data}
            </div>
          );
        })}
      </div>
    );
  }
}

Ticker.propTypes = propTypes;

function mapStateToProps(state, props) {
  const events = state.events.get(props.channel);
  return {
    isFetching: state.events.get('isFetching'),
    error: state.messages.get('error'),
    events: events ? events.get('events') : List()
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ eventActionCreators });
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
