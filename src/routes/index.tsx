import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { SplashScreen } from '../components/SplashScreen';
import { LoggedInRoute, PrivateRoute } from '../components/Routes';
import { initStore, history } from '../store';
import { theme } from '../assets/Theme';

import { Home } from './Home';
import Login from './Login';

const store = initStore();

function Router() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SplashScreen />
          <Switch>
            <LoggedInRoute path="/login">
              <Login />
            </LoggedInRoute>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export { Router };
