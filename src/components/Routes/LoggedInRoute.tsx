import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRouteProps } from './types';
import { SessionService } from '../../services/session';

export const LoggedInRoute = ({ children, ...rest }: IRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        SessionService.isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
