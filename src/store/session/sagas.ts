import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { history } from '../index';

import { SessionService } from '../../services/session';
import { BasicAction } from '../types/actions';
import { SplashActions } from '../splash/actions';
import { SessionActions, SessionActionTypes } from './actions';
import { getToken } from './api';
import { ISessionFetchTokenRequestPayload } from './types';

export function* sleep (time: number) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

export function* handleFetchTokenRequest(
  action: BasicAction<ISessionFetchTokenRequestPayload>
) {
  yield put(SplashActions.show());

  try {
    const res = yield call(getToken, action.payload);
    SessionService.setTokenToStorage(res.data);
    yield put(SessionActions.fetchTokenSuccess(res.data));
    history.push('/');
    yield put(SplashActions.hide());
  } catch (err) {
    yield put(SessionActions.fetchTokenFailure());
    yield put(SplashActions.hide());
    if (err.message) {
      toast.error(err.message);
      return;
    }
    toast.error(err.response?.data?.error_description);
  }
}

export function* handleFetchLogoutRequest() {
  try {
    yield put(SplashActions.show());
    SessionService.removeTokenFromStorage();
    yield put(SessionActions.fetchLogoutSuccess());
    history.push('/login');

    // Simulate request to API
    yield sleep(1000);
    yield put(SplashActions.hide());
  } catch (err) {
    yield put(SessionActions.fetchLogoutFailure());
    yield put(SplashActions.hide());
    // toast.error(err.response);
  }
}

export const sessionSagas = [
  takeEvery(
    SessionActionTypes.FETCH_TOKEN_REQUEST,
    handleFetchTokenRequest
  ),
  takeEvery(
    SessionActionTypes.FETCH_LOGOUT_REQUEST,
    handleFetchLogoutRequest
  )
];
