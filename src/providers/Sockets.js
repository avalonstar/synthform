import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { socketInit } from 'actions/sockets';

const Sockets = user => WrappedComponent => {
  class Wrapped extends Component {
    static propTypes = {
      init: PropTypes.func.isRequired
    };

    componentDidMount() {
      this.props.init(user);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    init: u => dispatch(socketInit.request(u))
  });

  return connect(null, mapDispatchToProps)(Wrapped);
};

export default Sockets;
