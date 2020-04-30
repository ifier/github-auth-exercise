import { createAction, ActionsUnion } from '../types/actions';
import {
  ISessionFetchTokenRequestPayload,
  ISessionFetchTokenResponsePayload
} from './types';

export enum SessionActionTypes {
  FETCH_TOKEN_REQUEST = '[Session] FETCH_TOKEN_REQUEST',
  FETCH_TOKEN_SUCCESS = '[Session] FETCH_TOKEN_SUCCESS',
  FETCH_TOKEN_FAILURE = '[Session] FETCH_TOKEN_FAILURE'
}

export const SessionActions = {
  fetchTokenRequest: (payload: ISessionFetchTokenRequestPayload) =>
    createAction(SessionActionTypes.FETCH_TOKEN_REQUEST, payload),
  fetchTokenSuccess: (payload: ISessionFetchTokenResponsePayload) =>
    createAction(SessionActionTypes.FETCH_TOKEN_SUCCESS, payload),
  fetchTokenFailure: () => createAction(SessionActionTypes.FETCH_TOKEN_FAILURE)
};

export type SessionActions = ActionsUnion<typeof SessionActions>;
