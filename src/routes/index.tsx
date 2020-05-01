import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import { SplashScreen } from '../components/SplashScreen';
import { LoggedInRoute, PrivateRoute } from '../components/Routes';
import { initStore, history } from '../store';
import { theme } from '../assets/Theme';

import { Home } from './Home';
import Login from './Login';
import { Page404 } from './404';

import 'react-toastify/dist/ReactToastify.css';

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
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </ConnectedRouter>
      </Provider>
      <ToastContainer autoClose={false} />
    </MuiThemeProvider>
  );
}

export { Router };
