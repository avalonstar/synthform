import _ from 'lodash';

import { ref } from 'configurations/constants';

export default function listenToEvents(channel, limit, cb, errorCb) {
  return ref.child(`events/${channel}`).limitToLast(limit).on(
    'value',
    snapshot => {
      const events = snapshot.val() || [];
      const payload = _.uniqBy(
        _.orderBy(events, 'timestamp', 'desc'),
        'timestamp'
      );
      cb(payload);
    },
    errorCb
  );
}
