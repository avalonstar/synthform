/* eslint-disable new-cap */

import tmi from 'tmi.js/src';

import { channel } from 'configurations/constants';

let client = null;

export function tmiMiddleware(store) {
  return next => action => {
    return next(action);
  };
}

export default function(store) {
  client = new tmi.client({
    options: { debug: true },
    connection: { secure: true },
    channels: [`#${channel}`]
  });
  client.connect();
}
