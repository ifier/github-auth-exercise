import { createAction, ActionsUnion } from '../types/actions';
import {
  ISearchRequestPayload,
  ISearchResponsePayload
} from './types';

export enum SearchActionTypes {
  EMPTY = '[Search] EMPTY',
  FETCH_REQUEST = '[Search] FETCH_REQUEST',
  FETCH_SUCCESS = '[Search] FETCH_SUCCESS',
  FETCH_FAILURE = '[Search] FETCH_FAILURE',
  FETCH_NEXT_PAGE_REQUEST = '[Search] FETCH_NEXT_PAGE_REQUEST',
  FETCH_NEXT_PAGE_SUCCESS = '[Search] FETCH_NEXT_PAGE_SUCCESS',
  FETCH_NEXT_PAGE_FAILURE = '[Search] FETCH_NEXT_PAGE_FAILURE'
}

export const SearchActions = {
  empty: () => createAction(SearchActionTypes.EMPTY),
  fetchRequest: (payload: ISearchRequestPayload) =>
    createAction(SearchActionTypes.FETCH_REQUEST, payload),
  fetchSuccess: (payload: ISearchResponsePayload) =>
    createAction(SearchActionTypes.FETCH_SUCCESS, payload),
  fetchFailure: () => createAction(SearchActionTypes.FETCH_FAILURE),
  fetchNextPageRequest: (payload: any) =>
    createAction(SearchActionTypes.FETCH_NEXT_PAGE_REQUEST, payload),
  fetchNextPageSuccess: (payload: any) =>
    createAction(SearchActionTypes.FETCH_NEXT_PAGE_SUCCESS, payload),
  fetchNextPageFailure: () =>
    createAction(SearchActionTypes.FETCH_NEXT_PAGE_FAILURE)
};

export type SearchActions = ActionsUnion<typeof SearchActions>;
