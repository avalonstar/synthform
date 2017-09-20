import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, List } from 'immutable';

import { songFetch } from 'actions/songs';

const propTypes = {
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

class Notifier extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return (
      <div>
        {this.props.totalSongs}
        {this.props.queue}
        {this.props.currentSong}
      </div>
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
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
