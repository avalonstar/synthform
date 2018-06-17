import * as fromMadness from 'reducers/special/madness';

export const getMadnessCheers = state => fromMadness.getCheers(state.events);
export const getMadnessNotifications = state =>
  fromMadness.getNotifications(state.events);
