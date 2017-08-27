import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import {
  AutoHostEvent,
  CheerEvent,
  FollowEvent,
  HostEvent,
  SubscriptionEvent,
  SubstreakEvent,
  TipEvent
} from './TickerEvent';

import './TickerItem.css';

const propTypes = {
  data: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired
};

const getEventType = eventData => ({
  autohost: AutoHostEvent({ ...eventData }),
  cheer: CheerEvent({ ...eventData }),
  follow: FollowEvent({ ...eventData }),
  host: HostEvent({ ...eventData }),
  subscription: SubscriptionEvent({ ...eventData }),
  resubscription: SubscriptionEvent({ ...eventData }),
  substreak: SubstreakEvent({ ...eventData }),
  tip: TipEvent({ ...eventData })
});

class TickerItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <Motion defaultStyle={{ y: 100 }} style={{ y: spring(this.props.delay) }}>
        {({ y }) =>
          <li
            className="ti-container"
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
            data-event={data.event}
          >
            <div className="ti">
              <div className="ti-actor">
                {data.username}
              </div>
              <div className="ti-piece">
                {getEventType(data)[data.event]}
              </div>
            </div>
          </li>}
      </Motion>
    );
  }
}

TickerItem.propTypes = propTypes;

export default TickerItem;
