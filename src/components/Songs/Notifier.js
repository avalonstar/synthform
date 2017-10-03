import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { songFetch } from 'actions/songs';

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
        <strong>{'!currentsong'}</strong>
        {' requested by '}
        <strong>{song.user}</strong>
        <small>
          {timeAgo}
          {' minutes ago'}
        </small>
      </div>
      <div className="sn-meta">
        {song.title}
        {song.artist}
        {song.duration}
      </div>
      <div className="sn-footer">
        <strong>{queueSize}</strong>
        {' songs in queue'}
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
