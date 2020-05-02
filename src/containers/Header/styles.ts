import { Theme, createStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  toolbar: {
    backgroundColor: grey[200],
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  companyTitle: {
    fontSize: 16,
    color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    textTransform: 'uppercase'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  }
});
