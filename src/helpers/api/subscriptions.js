import { ref } from 'configurations/constants';

export function listenToLatestSubscriber(channel, cb, errorCb) {
  return ref.child(`subscriptions/${channel}`).on(
    'child_added',
    data => {
      const subscriber = data.val();
      cb(subscriber);
    },
    errorCb
  );
}
