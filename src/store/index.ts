import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

export const history = createBrowserHistory();

export const initStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(middlewares)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
