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

import { useStyles } from './styles';

interface IProps {
  classes?: any;
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const CardsList = (props: IProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {cards.map(card => (
        <Grid item key={card} xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/random"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Heading
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
