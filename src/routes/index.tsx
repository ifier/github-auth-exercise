import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { Home } from './Home';
import Login from './Login';
import { initStore, history } from '../store';
import { theme } from '../assets/Theme';

const store = initStore();

function Router() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export { Router };
