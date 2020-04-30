import React from 'react';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FaGithub } from 'react-icons/fa';
import queryString from 'query-string';
import {
  Grid,
  Paper,
  Divider,
  Box,
  withStyles,
  Button
} from '@material-ui/core';

import { getOauthCodeEndPoint } from '../../config';
import { ISessionFetchTokenRequestPayload } from '../../store/session/types';
import { SessionActions } from '../../store/session/actions';
import { SignInForm } from './components/SignInForm';

import { styles } from './styles';

interface IProps {
  classes?: any;
  fetchTokenRequest: (payload: ISessionFetchTokenRequestPayload) => void;
  history?: any;
  location?: any;
  match?: any;
}

type initialQueryParams = {
  code: '';
};

class Login extends React.PureComponent<IProps> {
  componentDidMount() {
    const { location, fetchTokenRequest } = this.props;
    const params = queryString.parse(location.search) as initialQueryParams;
    if (params.code) {
      fetchTokenRequest(params);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={8} className={classes.image} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <SignInForm />
            <Box marginY={1} />
            <Grid container>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
            <Box marginY={1} />
            <Button
              fullWidth
              startIcon={<FaGithub />}
              size="large"
              color="primary"
              variant="contained"
              href={getOauthCodeEndPoint()}
            >
              Login with GitHub
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTokenRequest: (payload: ISessionFetchTokenRequestPayload) =>
    dispatch(SessionActions.fetchTokenRequest(payload))
});

export default withStyles(styles)(
  withRouter(
    connect(
      null,
      mapDispatchToProps
    )(Login)
  )
);
