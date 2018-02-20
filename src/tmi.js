/* eslint-disable new-cap */
import TwitchJS from 'twitch-js';

import { channel as clientChannel } from 'configurations/constants';
import * as actions from 'actions/tmi';

const { tmiConnect, tmiReceive } = actions;

let client = null;

export default function(store) {
  client = new TwitchJS.client({
    options: { debug: true },
    connection: { secure: true },
    channels: [`#${clientChannel}`]
  });
  client.connect();

  client.on('connecting', () => {
    store.dispatch(tmiConnect.request());
  });

  client.on('connected', () => {
    store.dispatch(tmiConnect.success());
  });

  client.on('chat', (channel, userstate, message, self) => {
    if (self) {
      return;
    }
    store.dispatch(
      tmiReceive.success(message, {
        displayName: userstate['display-name'],
        isBroadcaster: userstate.username === clientChannel,
        isMod: userstate.mod,
        isSubscriber: userstate.subscriber,
        username: userstate.username
      })
    );
  });
}
