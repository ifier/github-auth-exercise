import React, { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  CardContent,
  CardActions,
  Dialog
} from '@material-ui/core';
import { MdStar } from 'react-icons/md';
import { AiOutlineFork } from 'react-icons/ai';

import { getPage } from '../../store/search/api';
import { IRepository } from '../../store/search/types';
import { useStyles } from './styles';

interface IProps {
  repository: IRepository;
  classes?: any;
}

export const RepositoryCard = (props: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { repository } = props;

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const openDialog = useCallback(() => {
    setOpen(true);
    getPage(repository.full_name).then(res => {
      // @ts-ignore
      let doc = document.getElementById('iframe').contentWindow.document;
      doc.write(res.data);
    });
  }, [open, setOpen, repository.full_name]);

  return (
    <>
      <Card className={classes.card} onClick={openDialog}>
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
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="lg">
        <Box p={2}>
          <Box pb={2}>
            <div>{repository.html_url}</div>
          </Box>
          <iframe
            id="iframe"
            title={repository.full_name}
            width="100%"
            height={400}
            style={{ pointerEvents: 'none' }}
          />
        </Box>
      </Dialog>
    </>
  );
};
