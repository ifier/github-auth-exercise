import { createAction, ActionsUnion } from '../types/actions';
import {
  ISearchRequestPayload,
  ISearchResponsePayload
} from './types';

export enum SearchActionTypes {
  EMPTY = '[Search] EMPTY',
  FETCH_REQUEST = '[Search] FETCH_REQUEST',
  FETCH_SUCCESS = '[Search] FETCH_SUCCESS',
  FETCH_FAILURE = '[Search] FETCH_FAILURE'
}

export const SearchActions = {
  fetchRequest: (payload: ISearchRequestPayload) =>
    createAction(SearchActionTypes.FETCH_REQUEST, payload),
  fetchSuccess: (payload: ISearchResponsePayload) =>
    createAction(SearchActionTypes.FETCH_SUCCESS, payload),
  fetchFailure: () => createAction(SearchActionTypes.FETCH_FAILURE),
  empty: () => createAction(SearchActionTypes.EMPTY)
};

export type SearchActions = ActionsUnion<typeof SearchActions>;
