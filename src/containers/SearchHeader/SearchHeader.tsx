import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import { Dispatch } from 'redux';

import { ISearchRequestPayload, ISearchState } from '../../store/search/types';
import { SearchActions } from '../../store/search/actions';
import { IRootState } from '../../store/types/state';
import { SearchSelectors } from '../../store/search/selectors';

interface IProps extends ISearchState {
  classes?: any;
  onInputChangeDebounced?: any;
  fetchSearchRequest: (payload: ISearchRequestPayload) => void;
}

class SearchHeader extends React.Component<IProps> {
  onInputChange = (event: any) => {
    event.persist();
    this.onInputChangeDebounced(event);
  };

  onInputChangeDebounced = debounce(event => {
    const { params, fetchSearchRequest } = this.props;
    const { value } = event.target;
    fetchSearchRequest({
      ...params,
      q: value,
      page: 1
    });
  }, 300);

  render() {
    const { params, isFetching, isFetchingNext } = this.props;
    const disableInput = isFetching || isFetchingNext;

    return (
      <Grid container spacing={4} alignItems="center" justify="space-between">
        <Grid item xs={8} md={5}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name of repository"
            placeholder="Start typing..."
            onChange={this.onInputChange}
            disabled={disableInput}
            autoFocus
          />
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="body2">Sort by:</Typography>
            </Grid>
            <Grid item>
              <Select
                variant="outlined"
                value={''}
                disabled={!params.q || disableInput}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={['stars', 'desc']}>Most stars</MenuItem>
                <MenuItem value={['stars', 'asc']}>Fewest stars</MenuItem>
                <MenuItem value={['forks', 'desc']}>Most forks</MenuItem>
                <MenuItem value={['forks', 'asc']}>Fewest forks</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const searchState = SearchSelectors.makeGetState(state);

  return {
    ...searchState
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSearchRequest: (payload: ISearchRequestPayload) =>
    dispatch(SearchActions.fetchRequest(payload))
});

export default React.memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchHeader)
);
