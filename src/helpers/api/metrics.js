import { ref } from 'configurations/constants';

export function listenToSubPoints(channel, cb, errorCb) {
  return ref.child(`metrics/${channel}/performance/total/subpoints`).on(
    'value',
    snapshot => {
      const subpoints = snapshot.val();
      cb(subpoints);
    },
    errorCb
  );
}

export function listenToSubCount(channel, cb, errorCb) {
  return ref.child(`metrics/${channel}/performance/total/subscriptions`).on(
    'value',
    snapshot => {
      const subcount = snapshot.val();
      cb(subcount);
    },
    errorCb
  );
}
