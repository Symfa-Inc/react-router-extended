import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Guard } from '../../../../examples/using-of-guards/src/reactRouterAdvance';
import { MockGuard } from '../guards/mock.guard';
import { ChildGuardConsistencyWork } from '../pages/guards/child';
import { GuardLoginPage } from '../pages/guards/login-page-form';
import { MockConsistentlyWorkGuard } from '../pages/guards/mock-guard';
import { ParentGuardConsistencyWork } from '../pages/guards/parent';
import { HomePageRoute } from '../pages/guards/parent-auto-redirect';
import { ParentFailedGuard } from '../pages/guards/parent-with-failed-guard';
import { ParentWithRedirect } from '../pages/guards/parent-with-redirect-guard';
import { Child1GuardSmartCheck } from '../pages/guards/smart-check/child-1';
import { Child2GuardSmartCheck } from '../pages/guards/smart-check/child-2';
import { ParentGuardSmartCheck } from '../pages/guards/smart-check/parent';
import { ParentWithGuardsGuardSmartCheck } from '../pages/guards/smart-check/parent-with-guards';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { PageWithResolvers } from '../pages/resolvers/page';
import { Child1ResolverSmartCheck } from '../pages/resolvers/smart-check/child-1';
import { Child2ResolverSmartCheck } from '../pages/resolvers/smart-check/child-2';
import { ParentResolverSmartCheck } from '../pages/resolvers/smart-check/parent';
import { ParentWithResolversParentResolverSmartCheck } from '../pages/resolvers/smart-check/parent-with-resolvers';
import { SmartCheckResolver } from '../pages/resolvers/smart-check/smart-check-resolver';
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
import { TabPage } from '../pages/tab-page';
import { SecondStaticChild } from '../pages/tab-page/second-static-child-page';

import { StaticChild } from '../pages/tab-page/static-child-page';

import { ExtendedRoute } from '../reactRouterAdvance';

import { MockDataResolver } from '../resolvers/mock-data.resolver';

import { history } from './history';

class LoginGuard implements Guard {
  canActivate(): boolean {
    return localStorage.getItem('userAuthInfo') !== null;
  }
}

const NestedTest = () => {
  return <div>Nested</div>;
};
export const Routes = () => (
  <Router history={history}>
    <Switch>
      <ExtendedRoute path="/login" exact={true} component={LoginPage} />
      <ExtendedRoute path="/" exact={true} component={HomePage} />

      <ExtendedRoute path="/tab-page" component={TabPage} guards={[new MockGuard(true)]}>
        <ExtendedRoute component={StaticChild} path={'/static-child'}>
          <ExtendedRoute component={NestedTest} path={'/nested'} />
        </ExtendedRoute>
        <ExtendedRoute
          component={SecondStaticChild}
          path={'/second-static-child'}
          guards={[new MockGuard(true)]}
          resolvers={{
            mockUserData: new MockDataResolver({ name: 'Joy', lastName: 'Doy' }),
            mockUiData: new MockDataResolver({ color: 'blue' }),
          }}
        />
      </ExtendedRoute>

      <ExtendedRoute path="/simple-routing" component={SimpleRoutingParent1}>
        <ExtendedRoute exact={true} path="/nested-child" component={SimpleRoutingParent2}>
          <ExtendedRoute exact={true} path="/nested-child2" component={SimpleRoutingParent3}>
            <ExtendedRoute exact={true} path="/nested-child3" component={LastChild} />
          </ExtendedRoute>
        </ExtendedRoute>
      </ExtendedRoute>

      <ExtendedRoute component={ParentWithTwoChildren} path="/simple-routing-two-children">
        <ExtendedRoute exact={true} path="/first-children" component={FirstChild} />
        <ExtendedRoute exact={true} path="/second-children" component={SecondChild} />
      </ExtendedRoute>
      <ExtendedRoute component={ParentWithTwoChildrenDynamic} path="/routing-with-params-two-children">
        <ExtendedRoute exact={true} path="/:id/first-child" component={FirstDynamicChild} />
        <ExtendedRoute exact={true} path="/:id/second-child" component={SecondDynamicChild} />
      </ExtendedRoute>

      <ExtendedRoute path="/routing-with-params-dynamic-child" component={ParentWithParamsDynamicChild}>
        <ExtendedRoute exact={true} path="/:id" component={ChildWithParamsDynamicChild} />
      </ExtendedRoute>

      <ExtendedRoute
        path="/routing-with-params-dynamic-child-dynamic-parent/:id"
        component={ParentWithParamsDynamicChildDynamicParent}
      >
        <ExtendedRoute exact={true} path="/:id" component={ChildWithParamsDynamicChildDynamicParent} />
      </ExtendedRoute>

      <ExtendedRoute
        path="/routing-with-params-dynamic-child-static-parent/:id"
        component={ParentWithParamsDynamicChildStaticParent}
      >
        <ExtendedRoute exact={true} path="/child" component={ChildWithParamsDynamicChildStaticParent} />
      </ExtendedRoute>

      <ExtendedRoute
        path="/routing-with-params-dynamic-child-dynamic-parent-dynamic-child/:id"
        component={ParentWithParamsDynamicParentDynamicChildDynamicChild}
      >
        <ExtendedRoute exact={true} path="/:id" component={FirstChildWithParamsDynamicParentDynamicChildDynamicChild}>
          <ExtendedRoute
            exact={true}
            path="/:id"
            component={SecondChildWithParamsDynamicParentDynamicChildDynamicChild}
          />
        </ExtendedRoute>
      </ExtendedRoute>

      <ExtendedRoute path="/guards-consistency-work" component={ParentGuardConsistencyWork}>
        <ExtendedRoute
          exact={true}
          path="/child-with-guards"
          guards={[
            new MockConsistentlyWorkGuard(500, 'first message | '),
            new MockConsistentlyWorkGuard(100, 'second message | '),
            new MockConsistentlyWorkGuard(50, 'third message | '),
          ]}
          component={ChildGuardConsistencyWork}
        />
      </ExtendedRoute>
      <ExtendedRoute path="/guards-check-failed" component={ParentFailedGuard}>
        <ExtendedRoute
          exact={true}
          path="/:id/child-with-guards"
          redirectUrl="/guards-check-failed/1234/child-with-guards"
          guards={[
            new MockConsistentlyWorkGuard(50, 'first message | ', false),
            new MockConsistentlyWorkGuard(100, 'second message | '),
            new MockConsistentlyWorkGuard(50, 'third message | '),
          ]}
          component={ChildGuardConsistencyWork}
        />
      </ExtendedRoute>

      <ExtendedRoute path="/guards-check-failed-with-redirect" component={ParentWithRedirect}>
        <ExtendedRoute
          exact={true}
          path="/:id/child-with-guards"
          redirectUrl="/login"
          guards={[
            new MockConsistentlyWorkGuard(200, 'first message | ', false),
            new MockConsistentlyWorkGuard(100, 'second message | '),
            new MockConsistentlyWorkGuard(50, 'third message | '),
          ]}
          component={ChildGuardConsistencyWork}
        />
      </ExtendedRoute>

      <ExtendedRoute path="/guards-smart-check" component={ParentGuardSmartCheck}>
        <ExtendedRoute
          exact={true}
          path="/parent-with-guards"
          guards={[new MockConsistentlyWorkGuard(200, 'first message | ')]}
          component={ParentWithGuardsGuardSmartCheck}
        >
          <ExtendedRoute exact={true} path="/child-1" component={Child1GuardSmartCheck} />
          <ExtendedRoute exact={true} path="/child-2" component={Child2GuardSmartCheck} />
        </ExtendedRoute>
      </ExtendedRoute>

      <ExtendedRoute
        path="/page-with-resolvers"
        component={PageWithResolvers}
        resolvers={{
          mockUserData: new MockDataResolver({ name: 'Joy', lastName: 'Doy' }),
          mockUiData: new MockDataResolver({ color: 'blue' }),
        }}
      />

      <ExtendedRoute path="/resolver-smart-check" component={ParentResolverSmartCheck}>
        <ExtendedRoute
          exact={true}
          path="/parent-with-resolvers"
          resolvers={{
            firstResolver: new SmartCheckResolver(500),
            secondResolver: new SmartCheckResolver(500),
          }}
          component={ParentWithResolversParentResolverSmartCheck}
        >
          <ExtendedRoute exact={true} path="/child-1" component={Child1ResolverSmartCheck} />
          <ExtendedRoute exact={true} path="/child-2" component={Child2ResolverSmartCheck} />
        </ExtendedRoute>
      </ExtendedRoute>

      <ExtendedRoute
        component={HomePageRoute}
        path="/guard-auto-redirect"
        redirectUrl="/login-form"
        exact={true}
        guards={[new LoginGuard()]}
      />
      <ExtendedRoute component={GuardLoginPage} path="/login-form" exact={true} />
    </Switch>
  </Router>
);
