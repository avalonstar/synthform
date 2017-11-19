import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import { Map } from 'immutable';
import { Radio } from 'react-feather';

import { songFetch } from 'actions/songs';

import './Notifier.css';

const propTypes = {
  currentSong: PropTypes.instanceOf(Map),
  queueSize: PropTypes.number,
  request: PropTypes.func.isRequired
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

const defaultProps = {
  currentSong: Map(),
  queueSize: 0
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

function Song(props) {
  const { queueSize, song } = props;
  const timeAgo = moment().diff(song.requested, 'minutes');
  return (
    <div className="sn-content">
      <div className="sn-header">
        <div className="sn-widget-icon">
          <Radio color="#02fa7b" size={36} />
        </div>
        <div className="sn-widget">
          <span className="sn-duration">{song.duration}</span>
          <span className="sn-queuesize">
            <strong>{queueSize}</strong>
            {' in queue'}
          </span>
        </div>
      </div>
      <div className="sn-meta">
        <div className="song-artist">{song.artist}</div>
        <div className="song-title">{song.title}</div>
      </div>
      <div className="sn-footer">
        <span>
          {'Requested by '}
          <strong>{song.user}</strong>
        </span>
        <small>
          {timeAgo}
          {' minutes ago'}
        </small>
      </div>
    </div>
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
          <div className="sn" style={{ transform: `translate3d(0, ${y}%, 0)` }}>
            <Song
              queueSize={this.props.queueSize}
              song={this.props.currentSong.toJS()}
            />
          </div>
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
    currentSong: state.songs.get('currentSong'),
    queueSize: state.songs.get('queueSize')
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
