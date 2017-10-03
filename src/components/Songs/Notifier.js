import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { Radio } from 'react-feather';

import { songFetch } from 'actions/songs';

import './Notifier.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentSong: PropTypes.instanceOf(Map),
  queueSize: PropTypes.number,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  currentSong: Map(),
  queueSize: 0
};

function Song(props) {
  const { queueSize, song } = props;
  const timeAgo = moment().diff(song.requested, 'minutes');
  return (
    <div className="sn">
      <div className="sn-header">
        <div className="sn-widget-icon">
          <Radio size={36} />
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
  componentDidMount() {
    this.props.request();
  }

  render() {
    return this.props.isFetching ? (
      <div />
    ) : (
      <Song
        queueSize={this.props.queueSize}
        song={this.props.currentSong.toJS()}
      />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isFetching: state.songs.get('isFetching'),
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
