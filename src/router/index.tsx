import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ExtendedRouterProps, ExtentedRouterStatus } from './types';
import { useManager } from './hooks';
import * as UrlPattern from 'url-pattern';

import { isPathMatched, setKey } from './helpers';

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

  const routerManager = useManager({ resolvers, guards, pathname: location.pathname, redirectUrl });
  const [status, setStatus] = useState(ExtentedRouterStatus.INITIAL);

  useEffect(() => {
    (async () => {
      const isMatch = isPathMatched(location.pathname, path);
      if (isMatch) {
        const guardStatus = await routerManager.checkGuards(location.pathname);
        if (guardStatus === ExtentedRouterStatus.SUCCESS && Object.keys(resolvers).length) {
          await routerManager.loadResolvers(location.pathname);
        }
        setStatus(guardStatus);
      }
    })();
  }, [location.pathname]);
  if (status === ExtentedRouterStatus.SUCCESS) {
    return (
      <>
        <Route
          key={setKey(path)}
          exact={exact}
          path={path}
          render={props => {
            if (redirectToChild !== undefined && childs.length) {
              const lastIndex = redirectToChild.lastIndexOf('/');

              const onlyChildPath = redirectToChild.slice(lastIndex, redirectToChild.length);
              const parentPath = redirectToChild.split(onlyChildPath)[0];

              const pattern = new UrlPattern(parentPath);
              const match = pattern.match(location.pathname);
              const finalUrl = location.pathname + onlyChildPath;

              if (match && location.pathname !== finalUrl) {
                props.history.replace(finalUrl);
                return;
              }
            }
            return (
              <Component
                {...props}
                {...routerManager.getProps(location.pathname)}
                childRoutes={childs.map(route => (
                  <ExtendedRouter
                    {...route}
                    key={setKey(route.path)}
                    redirectUrl={route.redirectUrl}
                    location={location}
                  />
                ))}
              />
            );
          }}
        />
      </>
    );
  }

  if (status === ExtentedRouterStatus.FAIL) {
    return <Redirect to={routerManager.getRedirectUrl()} />;
  }

  return null;
};
