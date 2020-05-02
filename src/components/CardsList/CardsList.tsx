import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Typography, Box, CircularProgress } from '@material-ui/core';

import { RepositoryCard } from './Card';
import { ISearchResponsePayload } from '../../store/search/types';

interface IProps {
  list: ISearchResponsePayload;
  classes?: any;
  children?: any;
  paramsRequiredText?: string;
  noResultsText?: string;
  fetchNextPage: (payload: any) => void;
  isFetchingNext?: boolean;
}

export const CardsList = (props: IProps) => {
  const { list, paramsRequiredText, noResultsText, fetchNextPage } = props;
  const { items, total_count } = list;

  const fetchNextPageRequest = useCallback(() => {
    fetchNextPage({});
  }, []);

  if (!items) {
    return <Message message={paramsRequiredText} />;
  }

  if (!items.length) {
    return <Message message={noResultsText} />;
  }

  return (
    <div>
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        next={fetchNextPageRequest}
        hasMore={items.length < total_count}
        loader={Spinner()}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        dataLength={total_count}
      >
        <Grid container spacing={4}>
          {items.map(repository => (
            <Grid item key={repository.id} xs={12} sm={6} md={3}>
              <RepositoryCard repository={repository} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

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
