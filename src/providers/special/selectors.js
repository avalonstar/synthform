/* eslint-disable import/prefer-default-export  */

import * as fromMadness from 'reducers/special/madness';

export const getMadnessNotifications = state =>
  fromMadness.getNotifications(state.madness);
