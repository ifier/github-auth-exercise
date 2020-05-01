import React from 'react';

export interface IRouteProps {
  children: React.ReactChildren | React.ReactElement;
  exact?: boolean;
  path: string;
  store?: any;
}
