import { SearchActions, SearchActionTypes } from './actions';
import { ISearchState } from './types';

const initialState: ISearchState = {
  params: { q: '' },
  error: false,
  repositories: {},
  isFetching: false,
  isFetchingNext: false
};

export const searchReducer = (
  state: ISearchState = initialState,
  action: SearchActions
): ISearchState => {
  switch (action.type) {
    case SearchActionTypes.FETCH_REQUEST: {
      return {
        ...state,
        params: action.payload,
        isFetching: true,
        error: false
      }
    }
    case SearchActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        repositories: action.payload,
        isFetching: false,
      }
    }
    case SearchActionTypes.FETCH_FAILURE: {
      return {
        ...state,
        error: true,
        repositories: initialState.repositories,
        isFetching: false,
      }
    }
    default: {
      return state;
    }
  }
};
