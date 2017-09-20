import { ref } from 'configurations/constants';

export default function listenToUptime(channel, cb, errorCb) {
  return ref.child(`uptime/${channel}/active`).on(
    'value',
    snapshot => {
      const payload = snapshot.val() || null;
      let active = false;
      let startTime = null;
      if (payload) {
        active = payload || false;
        ref.child(`uptime/${channel}/startTime`).on('value', stSnapshot => {
          startTime = stSnapshot.val() || null;
          cb({ active, startTime });
        });
      } else {
        cb({ active, startTime });
      }
    },
    errorCb
  );
}
