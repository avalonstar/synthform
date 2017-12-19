import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import styled from 'styled-components';

import { christmasFetch } from 'actions/christmas';
import * as selectors from 'selectors';

import { Notifier, Ticker } from 'components/Events';
import SubPointGoal from 'components/Goals';
import { Generic, Uptime } from 'components/Labels';

const propTypes = {
  currentBroadcaster: PropTypes.instanceOf(Map).isRequired,
  nextBroadcaster: PropTypes.instanceOf(Map).isRequired,
  request: PropTypes.func.isRequired
};

const layoutPropTypes = {
  current: PropTypes.instanceOf(Map).isRequired
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;

  position: absolute;
  overflow: hidden;
  width: 1600px;
  height: 900px;
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;

  .t {
    grid-column: 7 / span 11;
    grid-row: 12;
    margin: 0 -24px 0 0;
    z-index: 200;
  }

  .n {
    grid-column: 1 / span 5;
    grid-row: 11;
    align-self: end;
    z-index: 300;

    &[data-event='follow'] {
      align-self: start;
      z-index: 0;
    }
  }

  .spg {
    grid-column: 15 / span 3;
    grid-row: 12;
    align-self: center;
  }

  .sn {
    grid-column: 15 / span 3;
    grid-row: 1;
    align-self: start;
  }
`;

const StyledUptime = styled(Uptime)`
  grid-column: 1 / span 3;
  grid-row: 12;
  align-self: center;
`;

const StyledGeneric = styled(Generic)`
  grid-column: 4 / span 3;
  grid-row: 12;
  align-self: center;
`;

const Background = styled.div`
  grid-column: 1 / span 17;
  grid-row: 12;
  margin: 0 -24px;
  z-index: -1;

  background: linear-gradient(#090a0c, #1a1f23);
`;

const Branding = styled.div`
  grid-column: 7 / span 8;
  grid-row: 12;
  align-self: center;
  padding: 10px 0 8px;

  border: 1px solid #3d4751;
  border-radius: 4px;
  color: #586674;
  font-family: ${props => props.theme.gotham};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 5px;
  text-align: center;
  text-transform: uppercase;
`;

function Layout({ current }) {
  return (
    <Container>
      <Ticker timer={2} />
      <Notifier />
      <StyledUptime title="#AVCC2017" />
      <StyledGeneric title="Live Now" content={current.get('data')} />
      <Branding>A Very Crusader Christmas: 2017 Edition</Branding>
      <SubPointGoal />
      <Background />
    </Container>
  );
}

class Christmas extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return (
      <Wrapper>
        <Layout
          current={this.props.currentBroadcaster}
          next={this.props.nextBroadcaster}
        />
      </Wrapper>
    );
  }
}

Christmas.propTypes = propTypes;
Layout.propTypes = layoutPropTypes;

function mapStateToProps(state) {
  return {
    currentBroadcaster: selectors.getCurrentChristmasBroadcaster(state),
    nextBroadcaster: selectors.getNextChristmasBroadcaster(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(christmasFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Christmas);
