import React from 'react';
import { FirstChildWithParamsDynamicParentDynamicChildDynamicChild } from '../pages/simple-routing-with-params/parent-dynamic-child-dynamic-child-dynamic/first-child';
import { ParentWithParamsDynamicParentDynamicChildDynamicChild } from '../pages/simple-routing-with-params/parent-dynamic-child-dynamic-child-dynamic/parent';
import { SecondChildWithParamsDynamicParentDynamicChildDynamicChild } from '../pages/simple-routing-with-params/parent-dynamic-child-dynamic-child-dynamic/second-child';
import { ChildWithParamsDynamicChildDynamicParent } from '../pages/simple-routing-with-params/parent-dynamic-child-dynamic/child';
import { ParentWithParamsDynamicChildDynamicParent } from '../pages/simple-routing-with-params/parent-dynamic-child-dynamic/parent';
import { ChildWithParamsDynamicChildStaticParent } from '../pages/simple-routing-with-params/parent-dynamic-child-static/child';
import { ParentWithParamsDynamicChildStaticParent } from '../pages/simple-routing-with-params/parent-dynamic-child-static/parent';
import { ChildWithParamsDynamicChild } from '../pages/simple-routing-with-params/static-parent-dynamic-child/child';
import { ParentWithParamsDynamicChild } from '../pages/simple-routing-with-params/static-parent-dynamic-child/parent';
import { FirstDynamicChild } from '../pages/simple-routing-with-params/two-children/first-child';
import { ParentWithTwoChildrenDynamic } from '../pages/simple-routing-with-params/two-children/parent';
import { SecondDynamicChild } from '../pages/simple-routing-with-params/two-children/second-child';
import { LastChild } from '../pages/simple-routing/nested-children/last-child';
import { SimpleRoutingParent1 } from '../pages/simple-routing/nested-children/parent-1';
import { SimpleRoutingParent2 } from '../pages/simple-routing/nested-children/parent-2';
import { SimpleRoutingParent3 } from '../pages/simple-routing/nested-children/parent-3';
import { FirstChild } from '../pages/simple-routing/two-children/first-child';
import { ParentWithTwoChildren } from '../pages/simple-routing/two-children/parent';
import { SecondChild } from '../pages/simple-routing/two-children/second-child';

import { ExtendedRouter } from '../reactRouterAdvance';

export const SimpleRoutes = () => (
  <>
    <ExtendedRouter path="/simple-routing" component={SimpleRoutingParent1}>
      <ExtendedRouter exact={true} path="/nested-child" component={SimpleRoutingParent2}>
        <ExtendedRouter exact={true} path="/nested-child2" component={SimpleRoutingParent3}>
          <ExtendedRouter exact={true} path="/nested-child3" component={LastChild} />
        </ExtendedRouter>
      </ExtendedRouter>
    </ExtendedRouter>

    <ExtendedRouter component={ParentWithTwoChildren} path="/simple-routing-two-children">
      <ExtendedRouter exact={true} path="/first-children" component={FirstChild} />
      <ExtendedRouter exact={true} path="/second-children" component={SecondChild} />
    </ExtendedRouter>
    <ExtendedRouter component={ParentWithTwoChildrenDynamic} path="/routing-with-params-two-children">
      <ExtendedRouter exact={true} path="/:id/first-child" component={FirstDynamicChild} />
      <ExtendedRouter exact={true} path="/:id/second-child" component={SecondDynamicChild} />
    </ExtendedRouter>

    <ExtendedRouter path="/routing-with-params-dynamic-child" component={ParentWithParamsDynamicChild}>
      <ExtendedRouter exact={true} path="/:id" component={ChildWithParamsDynamicChild} />
    </ExtendedRouter>

    <ExtendedRouter
      path="/routing-with-params-dynamic-child-dynamic-parent/:id"
      component={ParentWithParamsDynamicChildDynamicParent}
    >
      <ExtendedRouter exact={true} path="/:id" component={ChildWithParamsDynamicChildDynamicParent} />
    </ExtendedRouter>

    <ExtendedRouter
      path="/routing-with-params-dynamic-child-static-parent/:id"
      component={ParentWithParamsDynamicChildStaticParent}
    >
      <ExtendedRouter exact={true} path="/child" component={ChildWithParamsDynamicChildStaticParent} />
    </ExtendedRouter>

    <ExtendedRouter
      path="/routing-with-params-dynamic-child-dynamic-parent-dynamic-child/:id"
      component={ParentWithParamsDynamicParentDynamicChildDynamicChild}
    >
      <ExtendedRouter exact={true} path="/:id" component={FirstChildWithParamsDynamicParentDynamicChildDynamicChild}>
        <ExtendedRouter
          exact={true}
          path="/:id"
          component={SecondChildWithParamsDynamicParentDynamicChildDynamicChild}
        />
      </ExtendedRouter>
    </ExtendedRouter>
  </>
);
