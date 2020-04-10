import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ExtendedRouterProps, ExtentedRouterStatus } from './types';
import { useManager } from './hooks';

import { isPathMatched, setKey, isChildPathStartWithParent } from './helpers';

export const ExtendedRouter = ({
  path,
  component: Component,
  redirectUrl,
  guards = [],
  resolvers = {},
  childs = [],
  redirectToChild,
  exact,
  location,
}: ExtendedRouterProps) => {
  if (typeof location === 'undefined') {
    throw new Error('Extended router must be wrapper in usual router!');
  }

  const routerManager = useManager({ resolvers, guards });
  const [status, setStatus] = useState(ExtentedRouterStatus.INITIAL);

  const resultComponents = {
    [ExtentedRouterStatus.INITIAL]: null,
    [ExtentedRouterStatus.SUCCESS]: null,
    [ExtentedRouterStatus.FAIL]: <Redirect to={redirectUrl || '/'} />,
  };

  useEffect(() => {
    (async () => {
      const isMatch = isPathMatched(location.pathname, path);

      if (isMatch) {
        const guardStatus = await routerManager.checkGuards();

        if (guardStatus === ExtentedRouterStatus.SUCCESS && Object.keys(resolvers).length) {
          await routerManager.loadResolvers();
        }
        setStatus(guardStatus);
      }
    })();
  }, [location.pathname]);

  if (status === ExtentedRouterStatus.SUCCESS) {
    // If the status of the guards is passed
    if (childs.length) {
      const childRoutes = childs.map(route => {
        const isValidChildPath = isChildPathStartWithParent(route.path, path);
        if (!isValidChildPath) {
          throw new Error(`Child must start with parent path; Parent ${path} Child ${route.path}`);
        }
        return (
          <ExtendedRouter {...route} key={setKey(route.path)} redirectUrl={route.redirectUrl} location={location} />
        );
      });
      return (
        <Route
          exact={exact}
          path={path}
          render={props => {
            if (childs.length && props.location.pathname === path && redirectToChild !== false) {
              const childRedirectUrl = redirectToChild || childs[0].path;
              props.history.push(childRedirectUrl as string);
              return;
            }

            return <Component {...props} exact={exact} childRoutes={childRoutes} {...routerManager.getProps()} />;
          }}
        />
      );
    }

    return <Route exact={exact} path={path} render={props => <Component {...props} {...routerManager.getProps()} />} />;
  }

  return resultComponents[status];
};
