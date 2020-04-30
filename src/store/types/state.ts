import { ISessionState } from '../session/types';
import { ISplashState } from '../splash/types';

export interface IRootState {
  router: any;
  session: ISessionState;
  splash: ISplashState;
}
