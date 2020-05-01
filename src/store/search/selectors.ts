import { createSelector } from 'reselect';

import { IRootState } from '../types/state';
import { ISearchState } from './types';

const getState = (state: IRootState): ISearchState => state.search;

const getRepositories = (state: IRootState) => state.search.repositories;

const makeGetState = createSelector([getState], obj => obj);
const makeGetRepositories = createSelector([getRepositories], obj => obj);

export const SearchSelectors = {
  makeGetState,
  makeGetRepositories
};
