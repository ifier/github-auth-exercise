import React, { ReactText } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { debounce } from 'lodash';
import queryString from 'query-string';
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';

import { IParams, ISearchRequestPayload } from '../../store/search/types';
import { SearchActions } from '../../store/search/actions';

interface IProps extends RouteComponentProps {
  classes?: any;
  params: IParams;
  isFetching: boolean;
  isFetchingNext: boolean;
  onInputChangeDebounced?: any;
  fetchSearchRequest: (payload: ISearchRequestPayload) => void;
}

interface IFilters {
  sort?: string;
  order?: string;
}

interface IState {
  name: string | number | ReactText[];
  filters: string | IFilters | string[] | number;
}

class SearchHeader extends React.Component<IProps, IState> {
  state = {
    name: '',
    filters: 0
  };

  componentDidMount() {
    const {
      location: { search }
    } = this.props;

    if (search) {
      this.fetchSearch(search);
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const {
      location: { search },
      isFetching
    } = this.props;

    if (search && search !== prevProps.location.search && !isFetching) {
      this.fetchSearch(search);
    }
  }

  /**
   * This function handles initial search when link was shared
   * or browser back button was clicked
   * @param search
   */
  fetchSearch = (search: string) => {
    const { params, fetchSearchRequest } = this.props;
    const queryParams = queryString.parse(search, { parseNumbers: true });
    if (queryParams.q) {
      fetchSearchRequest({
        ...params,
        ...queryParams
      });
      this.setState({ name: queryParams.q });

      const { sort, order } = queryParams;
      if (sort && order) {
        this.setState({ filters: [String(sort), String(order)] });
      }
    }
  };

  onInputChange = (event: any) => {
    event.persist();
    this.onInputChangeDebounced(event);
    this.setState({ name: event.target.value, filters: 0 });
  };

  onInputChangeDebounced = debounce(event => {
    const { params, fetchSearchRequest } = this.props;
    const { value } = event.target;
    fetchSearchRequest({
      ...params,
      q: value,
      sort: undefined,
      order: undefined,
      page: 1
    });
  }, 500);

  onFiltersChanges = (e: any) => {
    const { params, fetchSearchRequest } = this.props;
    const { value }: { value: string } = e.target;
    let filters = { sort: undefined, order: undefined } as IFilters;

    if (value) {
      const { 0: sort, 1: order } = value.split(',');
      filters = { sort, order };
      this.setState({ filters: [sort, order] });
    } else {
      this.setState({ filters: 0 });
    }

    fetchSearchRequest({
      ...params,
      ...filters,
      page: 1
    });
  };

  render() {
    const { params, isFetching, isFetchingNext } = this.props;
    const { name, filters } = this.state;
    const disableInput = isFetching || isFetchingNext;

    return (
      <Grid container spacing={4} alignItems="center" justify="space-between">
        <Grid item xs={8} md={5}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name of repository"
            value={name}
            placeholder="Start typing..."
            onChange={this.onInputChange}
            disabled={disableInput}
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="body2">Sort by:</Typography>
            </Grid>
            <Grid item>
              <Select
                name="filters"
                variant="outlined"
                value={filters}
                disabled={!params.q || disableInput}
                onChange={this.onFiltersChanges}
              >
                <MenuItem value={0}>Best Match</MenuItem>
                <MenuItem value="stars,desc">Most stars</MenuItem>
                <MenuItem value="stars,asc">Fewest stars</MenuItem>
                <MenuItem value="forks,desc">Most forks</MenuItem>
                <MenuItem value="forks,asc">Fewest forks</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSearchRequest: (payload: ISearchRequestPayload) =>
    dispatch(SearchActions.fetchRequest(payload))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SearchHeader)
);
