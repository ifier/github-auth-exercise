import { Theme, createStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  toolbar: {
    backgroundColor: grey[200],
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  companyTitle: {
    color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  hero: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
});
