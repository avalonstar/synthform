import _ from 'lodash';
import moment from 'moment';

import { ref } from 'configurations/constants';

export function listenToMessages(channel, cb, errorCb) {
  return ref.child(`messages/${channel}`).limitToLast(40).on(
    'value',
    snapshot => {
      const messages = snapshot.val();
      const payload = _.uniqBy(
        _.orderBy(messages, 'timestamp', 'asc'),
        'timestamp'
      );
      cb(payload);
    },
    errorCb
  );
}
