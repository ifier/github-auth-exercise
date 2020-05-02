import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import queryString from 'query-string';

import { history } from '../index';
import { BasicAction } from '../types/actions';
import { SearchActions, SearchActionTypes } from './actions';
import { getRepositories } from './api';
import { ISearchRequestPayload } from './types';
import { SessionActions } from '../session/actions';

function* handleUnauthorised(err: any) {
  switch (err.response.status) {
    case 401: {
      yield put(SessionActions.fetchLogoutRequest());
      toast.error('Unauthorized - token has been expired or revoked. Login again please.');
      history.push('/login');
      break;
    }
    case 422: {
      history.push('/');
      break;
    }
    default: {
      history.push('/');
    }
  }
}

export function* handleFetchRequest(
  action: BasicAction<ISearchRequestPayload>
) {
  try {
    const routePath = queryString.stringify(action.payload);
    history.push(`?${routePath}`);
    const res = yield call(getRepositories, action.payload);
    yield put(SearchActions.fetchSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    yield put(SearchActions.fetchFailure());
    yield handleUnauthorised(err);
  }
}

export function* handleFetchNextPageRequest(
  action: BasicAction<ISearchRequestPayload>
) {
  try {
    const res = yield call(getRepositories, action.payload);
    yield put(SearchActions.fetchNextPageSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    yield put(SearchActions.fetchNextPageFailure());
    yield handleUnauthorised(err);
  }
}

export const searchSagas = [
  takeEvery(
    SearchActionTypes.FETCH_REQUEST,
    handleFetchRequest
  ),
  takeEvery(
    SearchActionTypes.FETCH_NEXT_PAGE_REQUEST,
    handleFetchNextPageRequest
  )
];
