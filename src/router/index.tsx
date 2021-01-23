import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { isNullOrUndefined, setKey } from './helpers';
import { useManager } from './hooks';
import { ExtendedRouterProps, ExtentedRouterStatus } from './types';

class ParentRoute {
  constructor(private parentRoute: string) {}

  get path() {
    return this.parentRoute;
  }
}

export const RouteContext = React.createContext({
  parent: new ParentRoute(''),
  outlet: null,
  routeData: {},
});

export const ExtendedRouter: FunctionComponent<ExtendedRouterProps> = props => {
  const [resolverInfo, setResolverInfo] = useState({});
  const [status, setGuardStatus] = useState<ExtentedRouterStatus>(ExtentedRouterStatus.INITIAL);

  useEffect(() => {
    if (props.resolvers !== undefined && !props.guards?.length && Object.values(props.resolvers).length === 0) {
      setGuardStatus(ExtentedRouterStatus.SUCCESS);
    }
  }, [location.pathname]);
  return (
    <Route
      key={setKey(props.path)}
      exact={props.exact}
      path={props.path}
      render={() => (
        <RouteContext.Provider
          value={{
            parent: new ParentRoute(props.path),
            outlet: props.children,
            routeData: resolverInfo,
          }}
        >
          <RouteContext.Consumer>
            {() => (
              <InnerExtendedRouter
                {...props}
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

  const setStatusAndPath = (status: ExtentedRouterStatus) => {
    setGuardStatus(status);
  };
  useEffect(() => {
    (async () => {
      const needToLoadExtraInfoForComponent = status === ExtentedRouterStatus.INITIAL;
      if (needToLoadExtraInfoForComponent) {
        const guardStatus = await routerManager.checkGuards(location.pathname);
        if (guardStatus === ExtentedRouterStatus.SUCCESS || !guards?.length) {
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
      status === ExtentedRouterStatus.SUCCESS &&
      ((resolvers !== undefined && Object.values(resolvers).length !== 0) || guards?.length)
    ) {
      setGuardStatus(ExtentedRouterStatus.INITIAL);
    }
  }

  const hasGuardsOrResolvers =
    (!isNullOrUndefined(resolvers) && Object.values(resolvers).length !== 0) ||
    (Array.isArray(guards) && guards.length !== 0);
  const firstRenderCondition = hasGuardsOrResolvers ? !firstRenderRef.current : true;
  if (status == ExtentedRouterStatus.SUCCESS && firstRenderCondition) {
    return <Component />;
  }

  if (status === ExtentedRouterStatus.FAIL) {
    return <Redirect to={routerManager.getRedirectUrl()} />;
  }

  return null;
};

export const ChildRoutes = () => {
  const context = React.useContext(RouteContext);
  const location = useLocation();
  if (context.parent.path !== location.pathname) {
    return context.outlet;
  }
  return null;
};

export const useResolver = () => {
  const context = React.useContext(RouteContext);
  return context.routeData;
};
