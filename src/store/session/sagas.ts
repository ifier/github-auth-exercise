import { call, put, takeEvery } from 'redux-saga/effects';

import { BasicAction } from '../types/actions';
import { SessionActions, SessionActionTypes } from './actions';
import { getToken } from './api';
import {
  ISessionFetchTokenRequestPayload
} from './types';
import { SplashActions } from '../splash/actions';

export function* handleFetchTokenRequest(
  action: BasicAction<ISessionFetchTokenRequestPayload>
) {
  try {
    yield put(SplashActions.show());

    const res = yield call(getToken, action.payload);
    console.log(res);
    // yield put(UpcomingActions.fetchSuccess(res));
  } catch (err) {
    console.error('>>>saga:handleFetchTokenSuccess:err', err);
    yield put(SessionActions.fetchTokenFailure());
    yield put(SplashActions.hide());
  }
}

export const sessionSagas = [
  takeEvery(
    SessionActionTypes.FETCH_TOKEN_REQUEST,
    handleFetchTokenRequest
  )
];
