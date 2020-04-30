import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { sessionReducer } from './session/reducer';
import { splashReducer } from './splash/reducer';

export const rootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  session: sessionReducer,
  splash: splashReducer
});
