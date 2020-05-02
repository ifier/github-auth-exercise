import React from 'react';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Typography, Box, CircularProgress } from '@material-ui/core';

import { RepositoryCard } from './Card';
import {
  IRepositoriesState,
  ISearchRequestPayload,
  ISearchNextPageRequestPayload
} from '../../store/search/types';

interface IProps {
  list: IRepositoriesState;
  params: ISearchRequestPayload;
  fetchNextPage: (payload: ISearchNextPageRequestPayload) => void;
  isFetchingNext: boolean;
  paramsRequiredText?: string;
  noResultsText?: string;
  classes?: any;
  children?: any;
  onClick?: () => void;
}

export class CardsList extends React.Component<IProps> {
  fetchNextPageRequest = debounce(() => {
    const { fetchNextPage, params, isFetchingNext } = this.props;

    if (!isFetchingNext) {
      fetchNextPage({
        ...params,
        page: params.page + 1
      });
    }
  }, 300);

  render() {
    const { list, paramsRequiredText, noResultsText } = this.props;
    const { items, total_count } = list;

    if (!items) {
      return <Message message={paramsRequiredText} />;
    }

    if (!items.length) {
      return <Message message={noResultsText} />;
    }

    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.fetchNextPageRequest}
        hasMore={items.length < total_count}
        loader={<Spinner key="spinner" />}
        threshold={150}
      >
        <Grid container spacing={4}>
          {items.map(repository => (
            <Grid item key={repository.id} xs={12} sm={6} md={3}>
              <RepositoryCard repository={repository} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    );
  }
}

const Message = ({ message }: { message?: string }) => {
  return (
    <Box p={10} style={{ textAlign: 'center', opacity: 0.5 }}>
      <Typography variant="h4" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

const Spinner = () => {
  return (
    <Box pt={5} pb={1} style={{ textAlign: 'center' }}>
      <CircularProgress />
    </Box>
  );
};
