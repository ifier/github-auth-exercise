import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  hero: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0),
  },
  main: {
    position: 'relative'
  },
  linearProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
});
