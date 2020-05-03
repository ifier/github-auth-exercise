import { union } from 'lodash';
import { SearchActions, SearchActionTypes } from './actions';
import { ISearchState } from './types';

const initialState: ISearchState = {
  params: { q: '', page: 1 },
  error: false,
  repositories: {
    total_count: 0
  },
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
    case SearchActionTypes.FETCH_NEXT_PAGE_REQUEST: {
      return {
        ...state,
        params: action.payload,
        isFetchingNext: true,
        error: false
      }
    }
    case SearchActionTypes.FETCH_NEXT_PAGE_SUCCESS: {
      const oldItems = state.repositories.items ? state.repositories.items : [];
      return {
        ...state,
        repositories: {
          ...action.payload,
          items: union([...oldItems, ...action.payload.items])
        },
        isFetchingNext: false,
        error: false
      }
    }
    case SearchActionTypes.FETCH_FAILURE: {
      return {
        ...state,
        error: true,
        isFetching: false,
        repositories: initialState.repositories
      }
    }
    case SearchActionTypes.FETCH_NEXT_PAGE_FAILURE: {
      return {
        ...state,
        error: true,
        isFetching: false,
      }
    }
    default: {
      return state;
    }
  }
};
