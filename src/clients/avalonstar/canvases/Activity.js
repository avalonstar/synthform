import React from 'react';
import PropTypes from 'prop-types';

import { Ticker } from 'components/Events';
import * as Providers from 'providers';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const layoutPropTypes = {
  user: PropTypes.string.isRequired,
  debugMode: PropTypes.bool.isRequired
};

const Layout = ({ user, debugMode }) => (
  <div>
    <Providers.Events user={user} debugMode={debugMode}>
      {payload => <Ticker events={payload} />}
    </Providers.Events>
  </div>
);

const Activity = props => {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return (
    <Wrapper>
      <Layout user="avalonstar" debugMode={debugMode} />
    </Wrapper>
  );
};

Activity.propTypes = propTypes;
Layout.propTypes = layoutPropTypes;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;

  position: absolute;
  overflow: hidden;
  width: 1600px;
  height: 900px;

  background: linear-gradient(
    105deg,
    ${rgba('#090a0c', 0)} 85%,
    ${rgba('#090a0c', 0.4)}
  );
`;

export default Activity;
