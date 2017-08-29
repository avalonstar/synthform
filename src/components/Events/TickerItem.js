import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';
import moment from 'moment';

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
  data: PropTypes.shape({
    event: PropTypes.string.isRequired
  }).isRequired,
  delayValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
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
  componentDidMount() {
    this.props.onChange();
  }

  render() {
    const { data } = this.props;
    const itemClasses = classNames('ti', {
      'ti-current': moment().isSame(data.timestamp, 'day')
    });
    return (
      <Motion
        defaultStyle={{ y: 100 }}
        style={{ y: spring(this.props.delayValue) }}
      >
        {({ y }) =>
          <li
            className="ti-container"
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
            data-event={data.event}
          >
            <div className={itemClasses}>
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
