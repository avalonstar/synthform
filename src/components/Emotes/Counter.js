import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { emoteFetch } from 'actions/emotes';

const propTypes = {
  emotes: PropTypes.instanceOf(List),
  request: PropTypes.func.isRequired
};

const emotePropTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

const defaultProps = {
  emotes: List()
};

const Emote = props => (
  <div>
    <img
      src={`//static-cdn.jtvnw.net/emoticons/v1/${props.id}/1.0`}
      alt={props.code}
    />
    {props.count}
  </div>
);

class Counter extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    const { emotes } = this.props;
    return (
      <div className="ec">
        {emotes.map((emoteData, i) => (
          <Emote {...emoteData.toJS()} code={emoteData.get('key')} />
        ))}
      </div>
    );
  }
}

Emote.propTypes = emotePropTypes;
Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    emotes: state.emotes.get('emotes')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(emoteFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
