import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';

import styled from 'styled-components';

import { emoteFetch } from 'actions/emotes';
import * as selectors from 'selectors';

import CounterItem from './CounterItem';

const propTypes = {
  emotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  limit: PropTypes.number.isRequired,
  request: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const StyledFlipMove = styled(FlipMove)`
  margin: 0;
  padding: 0 12px;

  list-style: none;

  display: flex;
  justify-content: space-between;
`;

class Counter extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    const { emotes } = this.props;
    return (
      <StyledFlipMove
        typeName="ol"
        className={this.props.className}
        enterAnimation={false}
      >
        {emotes
          .slice(0, this.props.limit)
          .map(emoteData => (
            <CounterItem {...emoteData} code={emoteData.key} />
          ))}
      </StyledFlipMove>
    );
  }
}

Counter.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    emotes: selectors.getTotalEmoteCounts(state)
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
