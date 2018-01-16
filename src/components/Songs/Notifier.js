import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import { Map } from 'immutable';
import { Radio } from 'react-feather';
import styled from 'styled-components';
import { rgba } from 'polished';

import { songFetch } from 'actions/songs';
import * as selectors from 'selectors';

const propTypes = {
  currentSong: PropTypes.instanceOf(Map),
  queueSize: PropTypes.number,
  request: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const defaultProps = {
  currentSong: Map(),
  queueSize: 0
};

const songPropTypes = {
  queueSize: PropTypes.number.isRequired,
  song: PropTypes.shape({
    user: PropTypes.string,
    requested: PropTypes.string,
    artist: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.string
  })
};

const songDefaultProps = {
  song: {
    user: '',
    requested: '',
    artist: '',
    title: '',
    duration: ''
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background: linear-gradient(#2c333a, #23292f);
  border-radius: 4px;
  box-shadow: 0 10px 20px ${rgba('#090a0c', 0.19)},
    0 6px 6px ${rgba('#090a0c', 0.23)};
  color: #1a1f23;
  font-family: ${props => props.theme.gotham};
  font-size: 14px;

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    5% {
      transform: rotate(-10deg) scale(1);
    }
    10% {
      transform: rotate(10deg) scale(1.1);
    }
    15% {
      transform: rotate(-10deg) scale(0.95);
    }
    20% {
      transform: rotate(0deg) scale(1);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const Content = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 14px 18px 0;

  color: #a2adb9;

  svg {
    animation: 5s ease-in-out infinite wiggle;
  }
`;

const WidgetIcon = styled.div`
  flex: 1;
`;

const Widget = styled.div`
  display: flex;
  position: relative;
  top: 4px;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px #4f5c69;
  font-size: 13px;
`;

const Duration = styled.span`
  padding: 5px 8px;
  font-weight: 700;
`;

const QueueSize = styled.span`
  box-shadow: inset 1px 0 0 #4f5c69;
  padding: 5px 7px 5px 8px;
`;

const Metadata = styled.div`
  padding: 2px 18px 18px;
`;

const SongArtist = styled.div`
  color: #7f8f9f;
  padding-bottom: 4px;
`;

const SongTitle = styled.div`
  color: #d0d6dc;
  font-size: 18px;
  font-weight: 700;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 12px 18px;

  background: #1a1f23;
  border-top: 1px solid #23292f;
  color: #607080;
  font-family: $font-forza;
  font-weight: 600;
  text-transform: uppercase;

  small {
    color: #46525d;
  }
  strong {
    color: #96a3b0;
  }
`;

function Song(props) {
  const { queueSize, song } = props;
  const timeAgo = moment().diff(song.requested, 'minutes');
  return (
    <Content>
      <Header>
        <WidgetIcon>
          <Radio color="#02fa7b" size={36} />
        </WidgetIcon>
        <Widget>
          <Duration>{song.duration}</Duration>
          <QueueSize>
            <strong>{queueSize}</strong>
            {' in queue'}
          </QueueSize>
        </Widget>
      </Header>
      <Metadata>
        <SongArtist>{song.artist}</SongArtist>
        <SongTitle>{song.title}</SongTitle>
      </Metadata>
      <Footer>
        <span>
          {'Requested by '}
          <strong>{song.user}</strong>
        </span>
        <small>
          {timeAgo}
          {' minutes ago'}
        </small>
      </Footer>
    </Content>
  );
}

class Notifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      timer: 15 * 1000
    };

    this.timerExpired = () => {
      this.setState({ isVisible: false });
    };

    this.activateTimer = () => {
      this.timer = setTimeout(() => {
        this.timerExpired();
        this.deactivateTimer();
      }, this.state.timer);
      setTimeout(() => this.setState({ isVisible: true }), 500);
    };
  }

  componentDidMount() {
    this.props.request();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.currentSong.size !== 0 &&
      nextProps.currentSong.get('title') !== this.props.currentSong.get('title')
    ) {
      this.activateTimer();
    }
  }

  componentWillUnmount() {
    this.deactivateTimer();
  }

  deactivateTimer() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Motion
        defaultStyle={{ y: -150 }}
        style={{
          y: spring(this.state.isVisible ? 0 : -150, {
            stiffness: 120,
            damping: 14
          })
        }}
      >
        {({ y }) => (
          <Wrapper
            className={this.props.className}
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
          >
            <Song
              queueSize={this.props.queueSize}
              song={this.props.currentSong.toJS()}
            />
          </Wrapper>
        )}
      </Motion>
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;
Song.propTypes = songPropTypes;
Song.defaultProps = songDefaultProps;

function mapStateToProps(state) {
  return {
    currentSong: selectors.getCurrentSong(state),
    queueSize: selectors.getQueueSize(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(songFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
