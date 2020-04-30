import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  }
});
