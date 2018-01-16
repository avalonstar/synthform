import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import { rgba } from 'polished';
import { ChevronRight } from 'react-feather';

import { UptimeTimer as Timer } from 'components/Timers';
import { uptimeFetch } from 'actions/uptime';
import * as selectors from 'selectors';

const propTypes = {
  title: PropTypes.string,
  startTime: PropTypes.number,
  className: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  title: '',
  startTime: null
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  overflow: hidden;

  background: linear-gradient(#2c333a, #23292f);
  border-radius: 4px;
  box-shadow: 0 1px 3px ${rgba('#090a0c', 0.12)},
    0 1px 2px ${rgba('#090a0c', 0.24)};
  color: #f3f5f6;
  font-size: 14px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 10px 9px 8px;
  margin-right: 10px;

  background: linear-gradient(#23292f, #1a1f23);
  color: #738596;
  font-family: ${props => props.theme.forza};
  font-weight: 700;
`;

const StyledTimer = styled(Timer)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.gotham};
  font-weight: 700;
`;

class Uptime extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return this.props.startTime ? (
      <Wrapper className={this.props.className}>
        <Title>
          <ChevronRight color="#02fa7b" size={16} />
          {this.props.title}
        </Title>
        <StyledTimer startTime={this.props.startTime} />
      </Wrapper>
    ) : (
      <div />
    );
  }
}

Uptime.propTypes = propTypes;
Uptime.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    startTime: selectors.getStreamStartTime(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(uptimeFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Uptime);
