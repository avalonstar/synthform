import { ref } from 'configurations/constants';

export default function listenToLatestSubscriber(channel, cb, errorCb) {
  return ref.child(`subscriptions/${channel}`).limitToLast(1).on(
    'child_added',
    data => {
      const subscriber = data.val();
      cb(subscriber);
    },
    errorCb
  );
}
