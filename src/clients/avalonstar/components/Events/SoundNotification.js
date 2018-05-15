import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

const propTypes = {
  event: PropTypes.shape({ event: PropTypes.string }),
  onComplete: PropTypes.func.isRequired
};

const defaultProps = {
  event: { event: '' }
};

class SoundNotification extends Component {
  state = {
    playStatus: Sound.status.STOPPED
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.timer = setTimeout(() =>
        this.setState({ playStatus: Sound.status.PLAYING })
      );
    }
  }

  handleRest = () => {
    setTimeout(() => this.props.onComplete(), 500);
  };

  handleSongFinishedPlaying = () => {
    this.setState({ playStatus: Sound.status.STOPPED });
    clearTimeout(this.timer);
    this.handleRest();
  };

  render() {
    const data = this.props.event;
    return (
      data.event && (
        <Sound
          url={`http://synthform.s3.amazonaws.com/audio/avalonstar/${
            data.event
          }.ogg`}
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={25}
        />
      )
    );
  }
}

SoundNotification.propTypes = propTypes;
SoundNotification.defaultProps = defaultProps;

export default SoundNotification;
