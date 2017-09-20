/* eslint-disable new-cap */

import tmi from 'tmi.js/src';

import { channel as clientChannel } from 'configurations/constants';
import * as actions from 'modules/tmi';

let client = null;

export default function(store) {
  client = new tmi.client({
    options: { debug: false },
    connection: { secure: true },
    channels: [`#${clientChannel}`]
  });
  client.connect();

  client.on('connecting', () => {
    store.dispatch(actions.settingTmiConnection());
  });

  client.on('connected', () => {
    store.dispatch(actions.settingTmiConnectionSuccess());
  });

  client.on('chat', (channel, userstate, message, self) => {
    if (self) {
      return;
    }
    store.dispatch(
      actions.returnLatestMessage(message, {
        displayName: userstate['display-name'],
        isBroadcaster: userstate.username === clientChannel,
        isMod: userstate.mod,
        isSubscriber: userstate.subscriber,
        username: userstate.username
      })
    );
  });
}
