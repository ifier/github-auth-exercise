import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  TextField,
  Grid,
  Button
} from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    input: {
      height: 18,
      padding: theme.spacing(1.5, 2)
    }
  });

interface IProps {
  classes?: any;
}

class SearchInput extends React.PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8} md={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            InputProps={{ classes: { input: classes.input } }}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <Button color="primary" fullWidth variant="contained" size="large">
            Search
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchInput);
