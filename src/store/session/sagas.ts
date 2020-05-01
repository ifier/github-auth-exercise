import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { history } from '../index';

import { SessionService } from '../../services/session';
import { BasicAction } from '../types/actions';
import { SplashActions } from '../splash/actions';
import { SessionActions, SessionActionTypes } from './actions';
import { getToken } from './api';
import { ISessionFetchTokenRequestPayload } from './types';

export function* handleFetchTokenRequest(
  action: BasicAction<ISessionFetchTokenRequestPayload>
) {
  try {
    yield put(SplashActions.show());

    const res = yield call(getToken, action.payload);
    SessionService.setTokenToStorage(res.data);
    yield put(SessionActions.fetchTokenSuccess(res));
    history.push('/');
    yield put(SplashActions.hide());
  } catch (err) {
    yield put(SessionActions.fetchTokenFailure());
    yield put(SplashActions.hide());
    toast.error(err.response.data.error_description);
  }
}

export const sessionSagas = [
  takeEvery(
    SessionActionTypes.FETCH_TOKEN_REQUEST,
    handleFetchTokenRequest
  )
];
