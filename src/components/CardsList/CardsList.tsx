import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';

import { RepositoryCard } from './Card';
import { IRepository } from '../../store/search/types';

interface IProps {
  items?: IRepository[];
  classes?: any;
  children?: any;
  paramsRequiredText?: string;
  noResultsText?: string;
  fetchNext?: () => void;
}

const renderMessage = (message?: string) => {
  return (
    <Box p={10} style={{ textAlign: 'center', opacity: 0.5 }}>
      <Typography variant="h4" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export const CardsList = (props: IProps) => {
  const { items, paramsRequiredText, noResultsText } = props;

  if (!items) {
    return renderMessage(paramsRequiredText);
  }

  if (!items.length) {
    return renderMessage(noResultsText);
  }

  return (
    <Grid container spacing={2}>
      {items.map(repository => (
        <Grid item key={repository.id} xs={12} sm={6} md={3}>
          <RepositoryCard repository={repository} />
        </Grid>
      ))}
    </Grid>
  );
};
