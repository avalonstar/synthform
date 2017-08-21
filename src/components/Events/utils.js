import _ from 'lodash';

export function getCheermoteURL(amount) {
  if (_.inRange(amount, 1, 99)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/gray/1';
  } else if (_.inRange(amount, 100, 999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/purple/1';
  } else if (_.inRange(amount, 1000, 4999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/green/1';
  } else if (_.inRange(amount, 5000, 9999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/blue/1';
  } else if (_.inRange(amount, 10000, 99999)) {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/red/1';
  } else {
    return 'https://static-cdn.jtvnw.net/bits/dark/animated/gold/1';
  }
}
