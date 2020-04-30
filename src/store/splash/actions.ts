import { createAction, ActionsUnion } from '../types/actions';

export enum SplashActionTypes {
  SPLASH_SCREEN_SHOW = '[Splash] SPLASH_SCREEN_SHOW',
  SPLASH_SCREEN_HIDE = '[Splash] SPLASH_SCREEN_HIDE',
}

export const SplashActions = {
  show: () =>
    createAction(SplashActionTypes.SPLASH_SCREEN_SHOW),
  hide: () =>
    createAction(SplashActionTypes.SPLASH_SCREEN_HIDE)
};

export type SplashActions = ActionsUnion<typeof SplashActions>;
