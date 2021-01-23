import React from 'react';

import { ExtendedRouter } from '../../src/reactRouterAdvance';
import { LastChild } from '../pages/simple-routing/nested-children/last-child';
import { SimpleRoutingParent1 } from '../pages/simple-routing/nested-children/parent-1';
import { SimpleRoutingParent2 } from '../pages/simple-routing/nested-children/parent-2';
import { SimpleRoutingParent3 } from '../pages/simple-routing/nested-children/parent-3';
import { FirstChild } from '../pages/simple-routing/two-children/first-child';
import { SimpleRouteParentWithTwoChildren } from '../pages/simple-routing/two-children/parent';
import { SecondChild } from '../pages/simple-routing/two-children/second-child';

export const SimpleRoutes = () => (
  <>
    <ExtendedRouter
      path="/simple-routing"
      component={SimpleRoutingParent1}
    >
      <ExtendedRouter
        exact={true}
        path="/nested-child"
        component={SimpleRoutingParent2}>
        <ExtendedRouter
          exact={true}
          path="/nested-child2"
          component={SimpleRoutingParent3}>
          <ExtendedRouter
            exact={true}
            path="/nested-child3"
            component={LastChild}>

          </ExtendedRouter>
        </ExtendedRouter>
      </ExtendedRouter>
    </ExtendedRouter>
    <ExtendedRouter component={SimpleRouteParentWithTwoChildren} path="/simple-routing-two-children">
      <ExtendedRouter
        exact={true}
        path="/first-children"
        component={FirstChild}>

      </ExtendedRouter>
      <ExtendedRouter
        exact={true}
        path="/second-children"
        component={SecondChild}>

      </ExtendedRouter>
    </ExtendedRouter>
  </>
);
