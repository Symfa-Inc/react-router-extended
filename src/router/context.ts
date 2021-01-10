import React from 'react';

export const RouteContext = React.createContext({
  outlet: null,
  params: {},
  pathname: '',
  route: null,
});
