import React from 'react';
import { Router, Switch } from 'react-router-dom';

import { ExtendedRouter } from '../../src/reactRouterAdvance';
import { MockGuard } from '../guards/mock.guard';
import { HomePage } from '../pages/home-page';
import { TabPage } from '../pages/tab-page';
import { SecondStaticChild } from '../pages/tab-page/second-static-child-page';

import { StaticChild } from '../pages/tab-page/static-child-page';

import { MockDataResolver } from '../resolvers/mock-data.resolver';

import { history } from './history';
import { SimpleRoutes } from './simple-route';

const NestedTest = () => {
  return <div>Nested</div>;
};
export const Routes = () => (
  <Router history={history}>
    <Switch>
      <ExtendedRouter path="/" exact={true} component={HomePage} />
      <ExtendedRouter path="/ttwt" exact={true} component={HomePage} />
      {/*<ExtendedRouter*/}
      {/*  path="/page-with-redirect"*/}
      {/*  guards={[new MockGuard(false)]}*/}
      {/*  redirectUrl="/"*/}
      {/*  exact={true}*/}
      {/*  component={HomePage}*/}
      {/*/>*/}
      {/*<ExtendedRouter*/}
      {/*  path="/page-with-redirect-on-guard"*/}
      {/*  guards={[new MockGuard(false, '/guard-redirect-url')]}*/}
      {/*  redirectUrl="/"*/}
      {/*  exact={true}*/}
      {/*  component={HomePage}*/}
      {/*/>*/}
      {/*<ExtendedRouter exact={true} path="/independent-page" component={IndependentPage}/>*/}
      {/*<ExtendedRouter*/}
      {/*  path="/page-with-redirect-on-static-child"*/}
      {/*  component={PageWithRedirectOnStaticChild}*/}
      {/*  redirectToChild="/page-with-redirect-on-static-child/static-child"*/}
      {/*  childs={[*/}
      {/*    {*/}
      {/*      component: FirstTargetPage,*/}
      {/*      path: '/page-with-redirect-on-static-child/static-child',*/}
      {/*    },*/}
      {/*    {*/}
      {/*      path: '/page-with-redirect-on-static-child/second-static-child',*/}
      {/*      component: SecondStaticChild,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      {/*<ExtendedRouter*/}
      {/*  path="/page-with-redirect-on-dynamic-child/:id"*/}
      {/*  component={PageWithRedirectOnStaticChild}*/}
      {/*  redirectToChild="/page-with-redirect-on-dynamic-child/:id/dynamic-child"*/}
      {/*  childs={[*/}
      {/*    {*/}
      {/*      component: DynamicTargetChild,*/}
      {/*      path: '/page-with-redirect-on-dynamic-child/:id/dynamic-child',*/}
      {/*    },*/}
      {/*    {*/}
      {/*      path: '/page-with-redirect-on-dynamic-child/:id/second-dynamic-child',*/}
      {/*      component: SecondStaticChild,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      <ExtendedRouter
        path="/tab-page"
        pageTitle="Tab page title"
        component={TabPage}
        guards={[new MockGuard(true)]}
        // childs={[
        //   {
        //     component: StaticChild,
        //     path: '/tab-page/static-child',
        //     pageTitle: 'Tab Child page title',
        //     resolvers: {
        //       mockUserData: new MockDataResolver({ name: 'Joy', lastName: 'Doy' }),
        //       mockUiData: new MockDataResolver({ color: 'blue' }),
        //     },
        //   },
        //   {
        //     path: '/tab-page/second-static-child',
        //     component: SecondStaticChild,
        //   },
        //   {
        //     path: '/tab-page/dynamic-path-child-page/:id',
        //     component: DynamicPathChildPage,
        //     childs: [
        //       {
        //         path: '/tab-page/dynamic-path-child-page/:id/static-child',
        //         component: DynamicParentStaticChild,
        //       },
        /*        path: '/tab-page/dynamic-path-child-page/:id/second-static-child',*/
        /*        component: DynamicParentSecondStaticChild,*/
        /*      },*/
        //       {
        //         path: '/tab-page/dynamic-path-child-page/:id/should-never-see',
        //         component: ShouldNeverSee,
        /*        guards: [new MockGuard(false)],*/
        //         redirectUrl: '/login',
        //       },
        //     ],
        //   },
        // ]}
      >
        <ExtendedRouter component={StaticChild} path={'/static-child'}>
          <ExtendedRouter component={NestedTest} path={'/nested'} />
        </ExtendedRouter>
        <ExtendedRouter
          component={SecondStaticChild} path={'/second-static-child'}
          guards={[new MockGuard(true)]}
          resolvers={{
            mockUserData: new MockDataResolver({ name: 'Joy', lastName: 'Doy' }),
            mockUiData: new MockDataResolver({ color: 'blue' }),
          }} />
      </ExtendedRouter>
      <SimpleRoutes />
    </Switch>
  </Router>
);
