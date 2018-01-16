import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
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

const Item = styled.div`
  padding: 14px 16px 15px 16px;
  color: #e8ebed;
  opacity: ${props =>
    moment().isSame(parseInt(props.timestamp, 10), 'day') ? 1 : 0.5};
`;

const Wrapper = styled.div`
  &:nth-of-type(1) {
    ${Item} {
      margin-right: 8px;
      padding-left: 0;
      background: linear-gradient(#1a1f23, #121417);
      opacity: 1;
    }
  }
`;

const Actor = styled.div`
  padding-bottom: 1px;
  font-family: ${props => props.theme.gotham};
  font-size: 14px;
  font-weight: 700;
`;

class TickerItem extends Component {
  componentDidMount() {
    this.props.onChange();
  }

  render() {
    const { data } = this.props;
    const username = data.event === 'subgift' ? data.recipient : data.username;

    return (
      <Motion defaultStyle={{ y: 100 }} style={{ y: spring(0) }}>
        {({ y }) => (
          <Wrapper
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
            data-event={data.event}
          >
            <Item timestamp={data.timestamp}>
              <Actor>{username}</Actor>
              {getEventType(data)[data.event]}
            </Item>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

TickerItem.propTypes = propTypes;

export default TickerItem;
