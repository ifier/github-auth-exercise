import React from 'react';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Link,
  withStyles
} from '@material-ui/core';

import { styles } from './styles';

interface IProps {
  classes: any;
}

class SignInForm extends React.PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(SignInForm);
