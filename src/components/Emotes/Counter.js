import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { emoteFetch } from 'actions/emotes';
import CounterItem from './CounterItem';

import './Counter.css';

const propTypes = {
  emotes: PropTypes.instanceOf(List),
  request: PropTypes.func.isRequired
};

const defaultProps = {
  emotes: List()
};

class Counter extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    const { emotes } = this.props;
    return (
      <FlipMove typeName="ol" className="ec" easing="ease">
        {emotes.map((emoteData, i) => (
          <CounterItem {...emoteData.toJS()} code={emoteData.get('key')} />
        ))}
      </FlipMove>
    );
  }
}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    emotes: state.emotes.get('emotes')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(emoteFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
