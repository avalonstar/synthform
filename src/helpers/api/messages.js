import _ from 'lodash';

import { ref } from 'configurations/constants';

export default function listenToMessages(channel, cb, errorCb) {
  return ref.child(`messages/${channel}`).limitToLast(20).on(
    'value',
    snapshot => {
      const messages = snapshot.val() || [];
      const payload = _.uniqBy(
        _.orderBy(messages, 'timestamp', 'asc'),
        'timestamp'
      );
      cb(payload);
    },
    errorCb
  );
}
