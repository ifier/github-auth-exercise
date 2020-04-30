import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

export const history = createBrowserHistory();

export const initStore = (initialState = {}) => {
  const routeMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routeMiddleware];

  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
