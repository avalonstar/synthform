import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from 'components/Chat';

import './Intertitle.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired
};

function Layout() {
  return (
    <div className="intertitle">
      <Chat />
    </div>
  );
}

function Intertitle(props) {
  return props.isFetching ? <div /> : Layout();
}

Intertitle.propTypes = propTypes;

function mapStateToProps(state) {
  const isFetching = [state.messages.get('isFetching')];
  return {
    isFetching: isFetching.every(Boolean)
  };
}

export default connect(mapStateToProps)(Intertitle);
