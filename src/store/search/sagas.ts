import { call, put, takeEvery } from 'redux-saga/effects';
// import { toast } from 'react-toastify';

import { BasicAction } from '../types/actions';
import { SearchActions, SearchActionTypes } from './actions';
import { getRepositories } from './api';
import { ISearchRequestPayload } from './types';

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
    // toast.error('error');
  }
}

export const searchSagas = [
  takeEvery(
    SearchActionTypes.FETCH_REQUEST,
    handleFetchRequest
  )
];
