import React from 'react';
import PropTypes from 'prop-types';

import { SoundNotifier } from 'clients/avalonstar/components';
import * as Providers from 'providers';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const Audio = props => {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return (
    /* eslint-disable react/prop-types */

    <Providers.Events user="avalonstar" debugMode={debugMode}>
      {(events, onComplete) => (
        <SoundNotifier
          notifierPool={events.notifierPool}
          onComplete={onComplete}
        />
      )}
    </Providers.Events>
    /* eslint-enable react/prop-types */
  );
};

Audio.propTypes = propTypes;

export default Providers.Sockets('avalonstar')(Audio);
