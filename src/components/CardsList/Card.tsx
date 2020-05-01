import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  CardContent,
  CardActions
} from '@material-ui/core';
import { MdStar } from 'react-icons/md';
import { AiOutlineFork } from 'react-icons/ai';

import { IRepository } from '../../store/search/types';
import { useStyles } from './styles';

interface IProps {
  repository: IRepository;
  classes?: any;
}

export const RepositoryCard = (props: IProps) => {
  const classes = useStyles();
  const { repository } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={repository.owner.avatar_url}
        title={repository.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {repository.name}
        </Typography>
        <Typography>{repository.description}</Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Button disabled startIcon={<AiOutlineFork />}>
              {repository.forks_count}
            </Button>
          </Grid>
          <Grid>
            <Button disabled startIcon={<MdStar />}>
              {repository.stargazers_count}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
