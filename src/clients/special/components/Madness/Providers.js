import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string
};

const defaultProps = {
  value: 'ffv'
};

export const GameContext = React.createContext();

export const GameProvider = props => (
  <GameContext.Provider value={props.value}>
    {props.children}
  </GameContext.Provider>
);

GameProvider.propTypes = propTypes;
GameProvider.defaultProps = defaultProps;
