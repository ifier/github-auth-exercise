import { all } from 'redux-saga/effects';

import { sessionSagas } from './session/sagas';

export const rootSaga = function*() {
  yield all([...sessionSagas]);
};
