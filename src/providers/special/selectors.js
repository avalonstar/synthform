import * as fromRpgm from 'reducers/special/rpgm';

export const getRpgmCheers = state => fromRpgm.getCheers(state.events);
export const getRpgmNotifications = state =>
  fromRpgm.getNotifications(state.events);
