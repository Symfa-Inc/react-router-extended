import React from 'react';

import { ExtendedRouter } from '../../src/reactRouterAdvance';
import { SimpleRoutePage } from '../pages/simple-routing/simple-route-page';

export const SimpleRoutes = () => (
  <ExtendedRouter path="/simple-routing" exact={true} component={SimpleRoutePage} />
);
