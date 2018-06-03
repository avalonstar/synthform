import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { emoteFetch } from 'actions/emotes';
import * as selectors from './selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

class EmoteProvider extends Component {
  componentDidMount() {
    this.props.request(this.props.user);
  }

  render() {
    return this.props.children(this.props);
  }
}

EmoteProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  payload: selectors.getEmotes(state)
});

const mapDispatchToProps = dispatch => ({
  request: user => dispatch(emoteFetch.request(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmoteProvider);
