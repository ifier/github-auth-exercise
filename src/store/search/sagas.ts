import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { history } from '../index';
import { BasicAction } from '../types/actions';
import { SearchActions, SearchActionTypes } from './actions';
import { getRepositories } from './api';
import { ISearchRequestPayload } from './types';
import { SessionActions } from '../session/actions';

export function* handleFetchRequest(
  action: BasicAction<ISearchRequestPayload>
) {
  try {
    const res = yield call(getRepositories, action.payload);
    console.log(res.data);
    yield put(SearchActions.fetchSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    yield put(SearchActions.fetchFailure());

    // Logout if Token was revoked
    if (err.response.status === 401) {
      yield put(SessionActions.fetchLogoutRequest());
      toast.error('Unauthorized - token has been expired or revoked. Login again please.');
      history.push('/login');
    }
  }
}

export const searchSagas = [
  takeEvery(
    SearchActionTypes.FETCH_REQUEST,
    handleFetchRequest
  )
];
