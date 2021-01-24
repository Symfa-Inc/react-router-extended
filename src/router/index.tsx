import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';

import { isNullOrUndefined, setKey } from './helpers';
import { useManager } from './hooks';
import { ExtendedRouterProps, ExtendedRouterStatus } from './types';

class RouteCollector {
  private children: RouteCollector[] = [];

  get path() {
    return this.currentRouteController;
  }

  constructor(private currentRouteController: string, private parentRoute: RouteCollector | null) {}

  addChildRoute(childRoute: RouteCollector) {
    this.children.push(childRoute);
  }

  getFullPathForChild(childrenPath: string) {
    const parentPath = this.getFullPathForRoute();
    return parentPath + childrenPath;
  }

  getChildRouteByPath(childPath: string) {
    return this.children.find(cr => cr.path === childPath);
  }

  getFullPathForRoute() {
    const parentRoute = (!isNullOrUndefined(this.parentRoute) ? this.parentRoute?.getFullPathForRoute() : '') as string;
    const normalizedParentPath = parentRoute === this.path ? '' : parentRoute;
    return `${normalizedParentPath}${this.path}`;
  }
}

export const RouteContext = React.createContext<{ parent: any; outlet: any; routeResolverInfos: any }>({
  parent: null,
  outlet: null,
  routeResolverInfos: {},
});

export const ExtendedRouter: FunctionComponent<ExtendedRouterProps> = props => {
  const context = React.useContext(RouteContext);
  const [resolverInfo, setResolverInfo] = useState({});
  const [status, setGuardStatus] = useState<ExtendedRouterStatus>(ExtendedRouterStatus.INITIAL);

  useEffect(() => {
    if (props.resolvers !== undefined && !props.guards?.length && Object.values(props.resolvers).length === 0) {
      setGuardStatus(ExtendedRouterStatus.SUCCESS);
    }
  }, [location.pathname]);
  const parentRoute = context.parent;
  let currentRouteController = new RouteCollector(
    props.path,
    !isNullOrUndefined(parentRoute) ? parentRoute : new RouteCollector(props.path, null),
  );
  if (parentRoute) {
    const currentRouteInParentRoute = parentRoute.getChildRouteByPath(props.path);
    if (!isNullOrUndefined(currentRouteInParentRoute)) {
      currentRouteController = currentRouteInParentRoute;
    } else {
      parentRoute.addChildRoute(currentRouteController);
    }
  }
  const componentPath = !isNullOrUndefined(parentRoute) ? parentRoute.getFullPathForChild(props.path) : props.path;
  return (
    <Route
      key={setKey(componentPath)}
      exact={!isNullOrUndefined(props.children) ? false : props.exact} // TODO: If parent has children route set exact to true doesn't make sense
      path={componentPath}
      render={() => (
        <RouteContext.Provider
          value={{
            parent: currentRouteController,
            outlet: props.children,
            routeResolverInfos: resolverInfo,
          }}
        >
          <RouteContext.Consumer>
            {() => (
              <InnerExtendedRouter
                {...props}
                path={componentPath}
                setResolverInfo={setResolverInfo}
                setGuardStatus={setGuardStatus}
                status={status}
              />
            )}
          </RouteContext.Consumer>
        </RouteContext.Provider>
      )}
    />
  );
};

const InnerExtendedRouter: FunctionComponent<ExtendedRouterProps> = ({
  path,
  component: Component,
  redirectUrl,
  guards = [],
  resolvers = {},

  setResolverInfo,
  setGuardStatus,
  status,
}) => {
  const location = useLocation();

  const routerManager = useManager({ resolvers, guards, pathname: location.pathname, redirectUrl });

  const setStatusAndPath = (status: ExtendedRouterStatus) => {
    setGuardStatus(status);
  };
  useEffect(() => {
    (async () => {
      const needToLoadExtraInfoForComponent = status === ExtendedRouterStatus.INITIAL;
      if (needToLoadExtraInfoForComponent) {
        const guardStatus = await routerManager.checkGuards(location.pathname);
        if (guardStatus === ExtendedRouterStatus.SUCCESS || !guards?.length) {
          if (Object.keys(resolvers).length) {
            const resolverData = await routerManager.loadResolvers();
            setResolverInfo(resolverData);
          }
        }
        setStatusAndPath(guardStatus);
      }
    })();
  }, [status]);

  const firstRenderRef = useRef<boolean>(true);
  useEffect(() => {
    firstRenderRef.current = false;
  }, []);
  if (firstRenderRef.current) {
    if (
      status === ExtendedRouterStatus.SUCCESS &&
      ((resolvers !== undefined && Object.values(resolvers).length !== 0) || guards?.length)
    ) {
      setGuardStatus(ExtendedRouterStatus.INITIAL);
    }
  }

  const hasGuardsOrResolvers =
    (!isNullOrUndefined(resolvers) && Object.values(resolvers).length !== 0) ||
    (Array.isArray(guards) && guards.length !== 0);
  const firstRenderCondition = hasGuardsOrResolvers ? !firstRenderRef.current : true;
  if (status == ExtendedRouterStatus.SUCCESS && firstRenderCondition) {
    return <Component />;
  }

  const redirectUrlIsSameAsCurrentPath = matchPath(redirectUrl || '', {
    path: path,
    exact: true,
    strict: false,
  });

  if (
    status === ExtendedRouterStatus.FAIL &&
    !isNullOrUndefined(redirectUrl) &&
    redirectUrl !== '' &&
    !redirectUrlIsSameAsCurrentPath
  ) {
    return <Redirect to={routerManager.getRedirectUrl()} />;
  }

  return null;
};

export const ChildRoutes = () => {
  return React.useContext(RouteContext).outlet;
};

export const useResolver = () => {
  return React.useContext(RouteContext).routeResolverInfos;
};
