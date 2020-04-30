import { SessionActions, SessionActionTypes } from './actions';
import { ISessionState } from './types';
import { SessionService } from '../../services/session';

const initialState: ISessionState = {
  error: false,
  token: SessionService.getTokenFromStorage(),
  tokenType: ''
};

export const sessionReducer = (
  state: ISessionState = initialState,
  action: SessionActions
): ISessionState => {
  switch (action.type) {
    case SessionActionTypes.FETCH_TOKEN_REQUEST: {
      return {
        ...state
      }
    }
    case SessionActionTypes.FETCH_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
};
