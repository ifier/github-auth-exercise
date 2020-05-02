import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from '@material-ui/core';

import { SessionActions } from '../../store/session/actions';
import { styles } from './styles';

interface IProps {
  classes?: any;
  fetchLogoutRequest: () => void;
}

class Header extends React.PureComponent<IProps> {
  render() {
    const { classes, fetchLogoutRequest } = this.props;

    return (
      <>
        <AppBar color="transparent">
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.companyTitle}
            >
              Search through repositories
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={fetchLogoutRequest}
              className={classes.link}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchLogoutRequest: () => dispatch(SessionActions.fetchLogoutRequest())
});

export default React.memo(
  withStyles(styles)(
    connect(
      null,
      mapDispatchToProps
    )(Header)
  )
);
