import React, { FunctionComponent, useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { isPathMatched, isPathTheSame, setKey } from './helpers';
import { useManager } from './hooks';
import { ExtendedRouterProps, ExtentedRouterStatus } from './types';

class ParentRoute {
  constructor(private parentRoute: string) {
  }

  get path() {
    return this.parentRoute;
  }
}

export const RouteContext = React.createContext({
  parent: new ParentRoute(''),
  guardStatus: ExtentedRouterStatus.INITIAL,
  outlet: null,
  routeData: {},
});

export const ExtendedRouter: FunctionComponent<ExtendedRouterProps> = (props) => {
  // const location = useLocation();
  // const context = React.useContext(RouteContext);

  // const routerManager = useManager({ resolvers, guards, pathname: location.pathname, redirectUrl });
  // const [status, setStatus] = useState(context.guardStatus);
  // const [storedPath, storePath] = useState<string>(path);
  // const [lastUpdateTime, forceUpdate] = useState(Date.now());

  // console.log('INITIAL STATUS', status, path);

  // const setStatusAndPath = (status: ExtentedRouterStatus) => {
  //   setStatus(status);
  //   storePath(path);
  // };
  //
  // const [resolverInfo, setResolverInfo] = useState({});
  // if (typeof location === 'undefined') {
  //   throw new Error('Extended router must be wrapper in usual router!');
  // }

  // return (
  //   <RouteContext.Provider value={{ parentPath: path, outlet: children }}>
  //     <RouteContext.Consumer>
  //       ((value) => (<Route
  //       key={setKey(path)}
  //       exact={exact}
  //       path={path}
  //       render={() => <Component></Component>}
  //     >)</Route>))
  //     </RouteContext.Consumer>
  //   </RouteContext.Provider>
  // );
  // //
  // useEffect(() => {
  //   (async () => {
  //     const isComponentPathMatched = isPathMatched(location.pathname, path);
  //     if (isComponentPathMatched) {
  //       let currentRouteStatus = status;
  //       // console.log('PATH', path, 'stored' + storedPath);
  //       const isNotOldCachedResult = status === ExtentedRouterStatus.SUCCESS && storedPath !== path && storedPath !== '';
  //       const isDirectRouteAndGuardAlreadyWorked =
  //         status === ExtentedRouterStatus.SUCCESS && storedPath !== '' && isPathTheSame(location.pathname, storedPath);
  //       if (isNotOldCachedResult || isDirectRouteAndGuardAlreadyWorked) {
  //         currentRouteStatus = ExtentedRouterStatus.INITIAL;
  //         console.log('INITIAL STATUS WAS SETTED', path);
  //         setStatusAndPath(ExtentedRouterStatus.INITIAL);
  //       }
  //       if (!guards?.length && !Object.values(resolvers).length) {
  //         console.log('!guards?.length && !Object.values(resolvers).length)', path);
  //         setStatusAndPath(ExtentedRouterStatus.SUCCESS);
  //       }
  //       const needToLoadExtraInfoForComponent = isComponentPathMatched && currentRouteStatus === ExtentedRouterStatus.INITIAL;
  //       if (needToLoadExtraInfoForComponent) {
  //         // console.log('CHECKING GUARDS', path);
  //         const guardStatus = await routerManager.checkGuards(location.pathname);
  //         if (guardStatus === ExtentedRouterStatus.SUCCESS || !guards?.length) {
  //           // console.log(path);
  //           // // if (pageTitle && ) {
  //           // //   console.log(pageTitle);
  //           // //   titleSubject.next(pageTitle);
  //           // // }
  //           if (Object.keys(resolvers).length) {
  //             const resolverData = await routerManager.loadResolvers();
  //             setResolverInfo(resolverData);
  //           }
  //         }
  //         setStatusAndPath(guardStatus);
  //       }
  //     }
  //
  //
  //   })();
  // }, [location.pathname]);
  // useEffect(() => {
  //   console.log(path);
  // }, []);

  // if ([context.guardStatus].includes(ExtentedRouterStatus.SUCCESS)) {
  //   console.log('RENDER' + path);
  const [resolverInfo, setResolverInfo] = useState({});
  const [status, setGuardStatus] = useState<ExtentedRouterStatus>(ExtentedRouterStatus.INITIAL);
  const location = useLocation();

  useEffect(() => {
    const isComponentPathMatched = isPathTheSame(location.pathname, props.path);
    if (isComponentPathMatched) {
      // if() {
      // console.log(`Stored path: ${storedPath} currentPath: ${path}`);
      // let currentRouteStatus = status;
      // console.log('PATH', path, 'stored' + storedPath);
      const isNotOldCachedResult = status === ExtentedRouterStatus.SUCCESS;
      // const isDirectRouteAndGuardAlreadyWorked =
      //   status === ExtentedRouterStatus.SUCCESS && storedPath !== '' && isPathTheSame(location.pathname, storedPath);
      // const hasGuardOrResolvers = props.resolvers !== undefined && !props.guards?.length && Object.values(props.resolvers).length !== 0;
      if (
        isNotOldCachedResult &&
        ((props.resolvers !== undefined && Object.values(props.resolvers).length !== 0) || props.guards?.length)
      ) {
        // status = ExtentedRouterStatus.INITIAL;
        // console.log('INITIAL STATUS WAS SETTED', props.path);
        setGuardStatus(ExtentedRouterStatus.INITIAL);
      }
      if (props.resolvers !== undefined && !props.guards?.length && Object.values(props.resolvers).length === 0) {
        // console.log('!guards?.length && !Object.values(resolvers).length)', props.path);
        setGuardStatus(ExtentedRouterStatus.SUCCESS);

      }
    }

  }, [location.pathname]);
  return (
    <RouteContext.Provider value={{
      parent: new ParentRoute(props.path),
      outlet: props.children,
      routeData: resolverInfo,
      guardStatus: status,
    }}>
      <RouteContext.Consumer>
        {() => (
          <InnerExtendedRouter {...props} setResolverInfo={setResolverInfo} setGuardStatus={setGuardStatus}/>
        )}
      </RouteContext.Consumer>
    </RouteContext.Provider>
  );
  // }
  // ;

  // if (context.guardStatus === ExtentedRouterStatus.FAIL) {
  //   return <Redirect to={routerManager.getRedirectUrl()}/>;
  // }
  //
  // return null;
};

const InnerExtendedRouter: FunctionComponent<ExtendedRouterProps> = ({
                                                                       path,
                                                                       component: Component,
                                                                       redirectUrl,
                                                                       guards = [],
                                                                       resolvers = {},
                                                                       // childs = [],
                                                                       // redirectToChild,
                                                                       exact,
                                                                       // location,
                                                                       // children,

                                                                       setResolverInfo,
                                                                       setGuardStatus,
                                                                       // pageTitle,
                                                                     }) => {
  const location = useLocation();
  const context = React.useContext(RouteContext);

  const routerManager = useManager({ resolvers, guards, pathname: location.pathname, redirectUrl });
  // const [status, setStatus] = useState(context.guardStatus);
  const [storedPath, storePath] = useState<string>(path);
  // const [lastUpdateTime, forceUpdate] = useState(Date.now());

  // console.log('INITIAL STATUS', status, path);

  const setStatusAndPath = (status: ExtentedRouterStatus) => {
    setGuardStatus(status);
    storePath(path);
  };

  // const [resolverInfo, setResolverInfo] = useState({});
  // if (typeof location === 'undefined') {
  //   throw new Error('Extended router must be wrapper in usual router!');
  // }

  // return (
  //   <RouteContext.Provider value={{ parentPath: path, outlet: children }}>
  //     <RouteContext.Consumer>
  //       ((value) => (<Route
  //       key={setKey(path)}
  //       exact={exact}
  //       path={path}
  //       render={() => <Component></Component>}
  //     >)</Route>))
  //     </RouteContext.Consumer>
  //   </RouteContext.Provider>
  // );
  //
  useEffect(() => {
    (async () => {
      const isComponentPathMatched = isPathMatched(location.pathname, path);
      if (isComponentPathMatched) {
        //   console.log(`Stored path: ${storedPath} currentPath: ${path}`);
        // let currentRouteStatus = context.guardStatus;
        //   // console.log('PATH', path, 'stored' + storedPath);
        //   const isNotOldCachedResult = context.guardStatus === ExtentedRouterStatus.SUCCESS && storedPath !== path && storedPath !== '';
        //   const isDirectRouteAndGuardAlreadyWorked =
        //     context.guardStatus === ExtentedRouterStatus.SUCCESS && storedPath !== '' && isPathTheSame(location.pathname, storedPath);
        //   if (isNotOldCachedResult || isDirectRouteAndGuardAlreadyWorked) {
        //     currentRouteStatus = ExtentedRouterStatus.INITIAL;
        //     // console.log('INITIAL STATUS WAS SETTED', path);
        //     setStatusAndPath(ExtentedRouterStatus.INITIAL);
        //   }
        //   if (!guards?.length && !Object.values(resolvers).length) {
        //     // console.log('!guards?.length && !Object.values(resolvers).length)', path);
        //     setStatusAndPath(ExtentedRouterStatus.SUCCESS);
        //   }
        const needToLoadExtraInfoForComponent = isComponentPathMatched && context.guardStatus === ExtentedRouterStatus.INITIAL;
        if (needToLoadExtraInfoForComponent) {
          // console.log('CHECKING GUARDS', path);
          const guardStatus = await routerManager.checkGuards(location.pathname);
          if (guardStatus === ExtentedRouterStatus.SUCCESS || !guards?.length) {
            // console.log(path);
            // // if (pageTitle && ) {
            // //   console.log(pageTitle);
            // //   titleSubject.next(pageTitle);
            // // }
            if (Object.keys(resolvers).length) {
              const resolverData = await routerManager.loadResolvers();
              setResolverInfo(resolverData);
            }
          }
          setStatusAndPath(guardStatus);
        }
      }


    })();
  }, [location.pathname, context.guardStatus]);
  // useEffect(() => {
  //   console.log(path);
  // }, []);

  if ([context.guardStatus].includes(ExtentedRouterStatus.SUCCESS)) {
    // console.log('RENDER' + path);
    return (
      // <RouteContext.Provider value={{
      //   parent: new ParentRoute(path),
      //   outlet: children,
      //   routeData: resolverInfo,
      //   guardStatus: status,
      // }}>
      //   <RouteContext.Consumer>
      //     {() => (
      <Route
        key={setKey(path)}
        exact={exact}
        path={path}
        render={() => <Component></Component>}>
      </Route>
      //     )}
      //   </RouteContext.Consumer>
      // </RouteContext.Provider>
    );
  }

  if (context.guardStatus === ExtentedRouterStatus.FAIL) {
    return <Redirect to={routerManager.getRedirectUrl()}/>;
  }

  return null;
};

export const ChildRoutes = () => {
  const context = React.useContext(RouteContext);
  const location = useLocation();
  if (context.parent.path !== location.pathname && context.guardStatus === ExtentedRouterStatus.SUCCESS) {
    return context.outlet;
  }
  return null;
};

export const useResolver = () => {
  const context = React.useContext(RouteContext);
  // const location = useLocation();
  // if (context.parent.path !== location.pathname) {
  return context.routeData;
  // }
  // return null;
  // console.log('context', context);

};
// export const ThemeContext = React.createContext({
//   theme: themes.dark,
//   toggleTheme: () => {},
// });
// const RouteConsumer = () => {
//   return (
//     <RouteContext.Consumer>
//       {() => (
//         <button>
//           Toggle Theme
//         </button>
//       )}
//     </RouteContext.Consumer>
//   )
// };
