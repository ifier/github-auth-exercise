import React from 'react';
import {
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  Divider,
  Link,
  Box,
  withStyles
} from '@material-ui/core';

import { SocialButton } from '../../components/Buttons/SocialButton';

import { styles } from './styles';

interface IProps {
  classes: any;
}

class Login extends React.PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={8} className={classes.image} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
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
                className={classes.submit}
                disabled
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
            <Box marginY={1} />
            <Grid container>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
            <Box marginY={2}>
              <SocialButton
                provider="github"
                gatekeeper="http://localhost:9999"
                appId="ca2c4b2be489d377f5cf"
                redirect="http://localhost:3000/login"
                onLoginSuccess={(test: any) => {
                  console.log(test._token);
                }}
              >
                Login with GitHub
              </SocialButton>
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
