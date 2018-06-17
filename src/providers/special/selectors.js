import * as fromMadness from 'reducers/special/madness';

export const getMadnessCheers = state => fromMadness.getCheers(state.madness);
export const getMadnessNotifications = state =>
  fromMadness.getNotifications(state.madness);
