import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, List } from 'immutable';

import { songFetch } from 'actions/songs';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  totalSongs: PropTypes.number,
  queue: PropTypes.instanceOf(List),
  currentSong: PropTypes.instanceOf(Map),
  request: PropTypes.func.isRequired
};

const defaultProps = {
  totalSongs: 0,
  queue: List(),
  currentSong: Map()
};

function Song(props) {
  console.log(props.song);
  if (props.song.createdAt) {
    console.log(props.song.track.artist);
  }
  return (
    props.song && (
      <div className="sn">
        {props.song.createdAt}
        {/* {this.props.totalSongs}
      {this.props.queue} */}
        {/* {props.track.title}
      {props.artist}
      {props.duration}
      {user.displayName} */}
      </div>
    )
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
      <Song song={{ ...this.props.currentSong.toJS() }} />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isFetching: state.songs.get('isFetching'),
    totalSongs: state.songs.get('totalSongs'),
    queue: state.songs.get('queue'),
    currentSong: state.songs.get('currentSong')
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
