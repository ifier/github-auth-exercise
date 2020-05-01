import { ISessionState } from '../session/types';
import { ISplashState } from '../splash/types';
import { ISearchState } from '../search/types';

export interface IRootState {
  router: any;
  session: ISessionState;
  splash: ISplashState;
  search: ISearchState;
}
