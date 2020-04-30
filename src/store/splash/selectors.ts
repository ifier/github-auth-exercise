import { createSelector } from 'reselect';

import { IRootState } from '../types/state';
import { ISplashState } from './types';

const getState = (state: IRootState): ISplashState => state.splash;

const makeGetState = createSelector([getState], obj => obj);

export const SplashSelectors = {
  makeGetState
};
