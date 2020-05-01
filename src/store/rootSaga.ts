import { all } from 'redux-saga/effects';

import { sessionSagas } from './session/sagas';
import { searchSagas } from './search/sagas';

export const rootSaga = function*() {
  yield all([...sessionSagas, ...searchSagas]);
};
