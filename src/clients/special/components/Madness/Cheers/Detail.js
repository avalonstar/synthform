import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import AnimatedNumber from 'react-animated-number';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';

const propTypes = {
  cheers: PropTypes.number,
  goal: PropTypes.number,
  name: PropTypes.string.isRequired
};

const defaultProps = {
  cheers: '0',
  goal: '0'
};

const progressionPropTypes = {
  progress: PropTypes.number.isRequired
};

const getWidth = (span, end) => Math.min(span / end * 100, 100);

const Progression = ({ progress }) => (
  <Motion defaultStyle={{ x: 0 }} style={{ x: spring(progress) }}>
    {({ x }) => (
      <ProgressBar>
        <Progress style={{ width: `${x}%` }} width={x} />
      </ProgressBar>
    )}
  </Motion>
);

const Detail = props => (
  <Broadcaster>
    <Progression progress={getWidth(props.cheers, props.goal)} />
    <Details key={props.name}>
      <Name>{props.name}</Name>
      <AnimatedNumber
        value={props.cheers}
        duration={500}
        stepPrecision={0}
        formatValue={n => numeral(n).format('0,0')}
      />/{numeral(props.goal).format('0,0')}
    </Details>
  </Broadcaster>
);

Detail.propTypes = propTypes;
Detail.defaultProps = defaultProps;
Progression.propTypes = progressionPropTypes;

const Broadcaster = styled.div``;

const ProgressBar = styled.div`
  margin-bottom: 2px;
  padding: 2px 3px;
  height: 11px;

  border: 2px solid #ffffff;
  border-radius: 100px;
`;

const Progress = styled.div`
  height: 3px;
  background-color: ${props => (props.width === 100 ? '#f8e000' : '#fff')};
  transition: background-color 250ms ease;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  font-size: 14px;
`;

const Name = styled.div`
  flex: 1;
  font-weight: 600;
  text-transform: capitalize;
`;

export default Detail;
