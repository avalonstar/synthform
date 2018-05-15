import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import styled from 'styled-components';
import { ellipsis } from 'polished';
import { Capsule } from 'clients/avalonstar/styles';
import { ChevronRight } from 'react-feather';

import { getCheermoteURL } from './utils';

const propTypes = {
  className: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  className: ''
};

const contentPropsTypes = {
  event: PropTypes.string.isRequired,
  amount: PropTypes.number,
  months: PropTypes.number,
  recipient: PropTypes.string,
  username: PropTypes.string
};

const contentDefaultProps = {
  amount: null,
  months: null,
  recipient: '',
  username: ''
};

const Content = props => (
  <Fragment>
    <Actor>{props.recipient || props.username}</Actor>
    {props.months && (
      <Length>
        <span>{'\u2715'}</span>
        {props.months}
      </Length>
    )}
    {props.event === 'cheer' && (
      <Amount>
        <span>{numeral(props.amount).format('0,0')}</span>
        <Cheermote alt={props.amount} src={getCheermoteURL(props.amount)} />
      </Amount>
    )}
    {props.event === 'tip' && (
      <Amount>
        <span>{numeral(props.amount).format('$0,0')}</span>
      </Amount>
    )}
  </Fragment>
);

const Panel = props => {
  const blacklistedEvents = ['follow', 'host'];
  const event = props.events.filter(
    e => !blacklistedEvents.includes(e.event)
  )[0];
  return (
    <Capsule.Wrapper className={props.className}>
      <Capsule.Title>
        <ChevronRight color="#02fa7b" size={16} />
        {'!hype'}
      </Capsule.Title>
      <Capsule.Content>{event && <Content {...event} />}</Capsule.Content>
    </Capsule.Wrapper>
  );
};

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
Content.propTypes = contentPropsTypes;
Content.defaultProps = contentDefaultProps;

const Actor = styled.div`
  ${ellipsis()};

  font-family: ${props => props.theme.gotham};
  font-weight: 700;
  flex: 1;
`;

const Amount = styled.div`
  position: relative;
  margin-left: 4px;
  padding: 3px 5px 3px 6px;
  box-shadow: inset 0 0 0 1px #586674;
  border-radius: 2px;
  font-family: ${props => props.theme.miedinger};
  font-weight: 500;

  span {
    position: relative;
    z-index: 10;
  }
`;

const Cheermote = styled.img`
  position: absolute;
  margin-left: 50%;
  top: -4px;
  left: -14px;
  height: 28px;
  opacity: 0.75;
`;

const Length = styled.div`
  margin-left: 4px;
  padding: 3px 5px 2px 6px;
  box-shadow: inset 0 0 0 1px #586674;
  border-radius: 2px;
  font-family: ${props => props.theme.miedinger};
  font-weight: 500;

  span {
    font-size: 10px;
  }
`;

export default Panel;
