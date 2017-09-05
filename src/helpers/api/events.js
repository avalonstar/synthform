import _ from 'lodash';

import { ref } from 'configurations/constants';

export default function listenToEvents(channel, debug, cb, errorCb) {
  const eventRef = debug ? 'test/events' : 'events';
  return ref.child(`${eventRef}/${channel}`).limitToLast(20).on(
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
