import { SplashActions, SplashActionTypes } from './actions';
import { ISplashState } from './types';

const initialState: ISplashState = {
  counter: 0,
  isFetching: false
};

export const splashReducer = (
  state: ISplashState = initialState,
  action: SplashActions
): ISplashState => {
  switch (action.type) {
    case SplashActionTypes.SPLASH_SCREEN_SHOW: {
      return {
        ...state,
        counter: state.counter + 1,
        isFetching: true
      }
    }
    case SplashActionTypes.SPLASH_SCREEN_HIDE: {
      const counter = state.counter - 1 < 0 ? 0 : state.counter - 1;
      return {
        ...state,
        counter,
        isFetching: counter !== 0
      }
    }
    default: {
      return state;
    }
  }
};
