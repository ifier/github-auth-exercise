import { SessionActions, SessionActionTypes } from './actions';
import { ISessionState } from './types';
import { SessionService } from '../../services/session';

const initialState: ISessionState = {
  error: false,
  access_token: SessionService.getAccessToken(),
  token_type: SessionService.getTokenType()
};

export const sessionReducer = (
  state: ISessionState = initialState,
  action: SessionActions
): ISessionState => {
  switch (action.type) {
    case SessionActionTypes.FETCH_TOKEN_REQUEST: {
      return {
        ...state,
        error: false
      }
    }
    case SessionActionTypes.FETCH_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: false
      }
    }
    case SessionActionTypes.FETCH_TOKEN_FAILURE: {
      return {
        ...state,
        error: true
      }
    }
    case SessionActionTypes.FETCH_LOGOUT_SUCCESS: {
      return {
        ...state,
        access_token: '',
        token_type: ''
      }
    }
    default: {
      return state;
    }
  }
};
