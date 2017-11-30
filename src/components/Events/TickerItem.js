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
  SubGiftEvent,
  ResubEvent,
  TipEvent
} from './TickerEvent';

import './TickerItem.css';
import chillest from './chillest.svg';
import dream from './dream.svg';
import wigglers from './wigglers.svg';

const propTypes = {
  data: PropTypes.shape({
    event: PropTypes.string.isRequired,
    team: PropTypes.string
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
  subgift: SubGiftEvent({ ...eventData }),
  resub: ResubEvent({ ...eventData }),
  tip: TipEvent({ ...eventData })
});

class TickerItem extends Component {
  constructor(props) {
    super(props);

    this.getTeamIcon = team => {
      switch (team) {
        case 'chillest':
          return chillest;
        case 'dream':
          return dream;
        case 'wigglers':
          return wigglers;
        default:
          return null;
      }
    };
  }

  componentDidMount() {
    this.props.onChange();
  }

  render() {
    const { data } = this.props;
    const itemClasses = classNames('ti', {
      'ti-current': moment().isSame(parseInt(data.timestamp, 10), 'day'),
      'ti-has-team': data.team
    });
    const username = data.event === 'subgift' ? data.recipient : data.username;

    return (
      <Motion
        defaultStyle={{ y: 100 }}
        style={{ y: spring(this.props.delayValue) }}
      >
        {({ y }) => (
          <li
            className="ti-container"
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
            data-event={data.event}
          >
            <div className={itemClasses}>
              {data.team && (
                <div className="ti-team">
                  <img src={this.getTeamIcon(data.team)} alt={data.team} />
                </div>
              )}
              <div className="ti-actor">{username}</div>
              {getEventType(data)[data.event]}
            </div>
          </li>
        )}
      </Motion>
    );
  }
}

TickerItem.propTypes = propTypes;

export default TickerItem;
