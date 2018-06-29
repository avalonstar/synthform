import React from 'react';

import { SoundNotifier } from 'clients/avalonstar/components';
import * as Providers from 'providers';

const Audio = () => (
  /* eslint-disable react/prop-types */
  <Providers.Events>
    {(_, notifierPool, onComplete) => (
      <SoundNotifier notifierPool={notifierPool} onComplete={onComplete} />
    )}
  </Providers.Events>
  /* eslint-enable react/prop-types */
);

export default Audio;
