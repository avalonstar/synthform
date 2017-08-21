import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  AutoHostEvent,
  CheerEvent,
  FollowEvent,
  HostEvent,
  SubscriptionEvent,
  SubstreakEvent,
  TipEvent
} from './TickerEvents';

const propTypes = {
  data: PropTypes.object
};

const getEventType = eventData => ({
  autohost: <AutoHostEvent {...eventData} />,
  cheer: <CheerEvent {...eventData} />,
  follow: <FollowEvent {...eventData} />,
  host: <HostEvent {...eventData} />,
  subscription: <SubscriptionEvent {...eventData} />,
  resubscription: <SubscriptionEvent {...eventData} />,
  substreak: <SubstreakEvent {...eventData} />,
  tip: <TipEvent {...eventData} />
});

class TickerItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="ti-container" data-event={data.event}>
        <div className="ti">
          <div className="ti-piece">
            {getEventType(data)[data.event]}
          </div>
          <div className="ti-actor">
            {data.username}
          </div>
        </div>
      </div>
    );
  }
}

TickerItem.propTypes = propTypes;

export default TickerItem;
