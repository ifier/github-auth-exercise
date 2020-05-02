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
import { history } from '../../store';

interface IProps extends RouteComponentProps {
  classes?: any;
  params: IParams;
  isFetching: boolean;
  isFetchingNext: boolean;
  onInputChangeDebounced?: any;
  fetchSearchRequest: (payload: ISearchRequestPayload) => void;
}

interface IState {
  name: string | number | ReactText[];
}

class SearchHeader extends React.Component<IProps, IState> {
  state = {
    name: ''
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

  fetchSearch = (search: string) => {
    const { params, fetchSearchRequest } = this.props;
    const queryParams = queryString.parse(search, { parseNumbers: true });
    if (queryParams.q) {
      fetchSearchRequest({
        ...params,
        ...queryParams
      });
      this.setState({ name: queryParams.q });
    }
  };

  onInputChange = (event: any) => {
    event.persist();
    this.onInputChangeDebounced(event);
    this.setState({ name: event.target.value });
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
    const { name } = this.state;
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
