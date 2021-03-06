import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styled from 'styled-components';

import {
  AutoHostEvent,
  CheerEvent,
  FollowEvent,
  HostEvent,
  SubscriptionEvent,
  SubGiftEvent,
  ResubEvent,
  TipEvent
} from './TickerEvent';

const propTypes = {
  data: PropTypes.shape({
    event: PropTypes.string.isRequired,
    team: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

const getEventType = eventData => ({
  autohost: AutoHostEvent({ ...eventData }),
  cheer: CheerEvent({ ...eventData }),
  follow: FollowEvent({ ...eventData }),
  host: HostEvent({ ...eventData }),
  subscription: SubscriptionEvent({ ...eventData }),
  subgift: SubGiftEvent({ ...eventData }),
  resub: ResubEvent({ ...eventData }),
  tip: TipEvent({ ...eventData })
});

class TickerItem extends Component {
  componentDidMount() {
    this.props.onChange();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }

  render() {
    const {
      data,
      data: { event, timestamp }
    } = this.props;
    const username = data.displayName || data.username;
    return (
      <Wrapper data-event={event}>
        <Item timestamp={timestamp}>
          <Actor>{username}</Actor>
          {getEventType(data)[data.event]}
        </Item>
      </Wrapper>
    );
  }
}

TickerItem.propTypes = propTypes;

const Item = styled.div`
  display: flex;
  align-items: baseline;
  padding: 11px 14px 11px 14px;
  color: #e8ebed;
  opacity: ${props =>
    moment().isSame(parseInt(props.timestamp, 10), 'day') ? 1 : 0.5};
`;

const Wrapper = styled.li`
  &:nth-of-type(2) {
    ${Item} {
      margin-right: 8px;
      padding-left: 0;
      background: linear-gradient(#1a1f23, #121417);
      opacity: 1;
    }
  }
`;

const Actor = styled.div`
  font-family: ${props => props.theme.gotham};
  font-size: 16px;
  font-weight: 700;
  padding-right: 8px;
`;

export default TickerItem;
