import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRouteProps } from './types';
import { SessionService } from '../../services/session';

export const PrivateRoute = ({ children, ...rest }: IRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        SessionService.isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
