import React, { FunctionComponent, useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { isPathMatched, setKey } from './helpers';
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

export const ExtendedRouter: FunctionComponent<ExtendedRouterProps> = ({
                                                                         path,
                                                                         component: Component,
                                                                         redirectUrl,
                                                                         guards = [],
                                                                         resolvers = {},
                                                                         // childs = [],
                                                                         // redirectToChild,
                                                                         exact,
                                                                         // location,
                                                                         children,
                                                                         // pageTitle,
                                                                       }) => {
  const location = useLocation();
  const context = React.useContext(RouteContext);

  const routerManager = useManager({ resolvers, guards, pathname: location.pathname, redirectUrl });
  const [status, setStatus] = useState(context.guardStatus);
  const [storedPath, storePath] = useState<string>('');
  // const [lastUpdateTime, forceUpdate] = useState(Date.now());

  console.log('INITIAL STATUS', status, path);

  const setStatusAndPath = (status: ExtentedRouterStatus) => {
    setStatus(status);
    storePath(path);
  };
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
      // setStatus(ExtentedRouterStatus.INITIAL);
      // forceUpdate(true);
      console.log(context.guardStatus);
      let currentRouteStatus = status;
      if (status === ExtentedRouterStatus.SUCCESS && storedPath !== path && storedPath !== '') {
        currentRouteStatus = ExtentedRouterStatus.INITIAL;
        setStatusAndPath(ExtentedRouterStatus.INITIAL);
      }
      const needToCheckGuards = isComponentPathMatched && currentRouteStatus === ExtentedRouterStatus.INITIAL;
      if (needToCheckGuards) {
        console.log('needToCheckGuards', path);
        const guardStatus = await routerManager.checkGuards(location.pathname);
        if (guardStatus === ExtentedRouterStatus.SUCCESS) {
          // console.log(path);
          // // if (pageTitle && ) {
          // //   console.log(pageTitle);
          // //   titleSubject.next(pageTitle);
          // // }
          if (Object.keys(resolvers).length) {
            await routerManager.loadResolvers(location.pathname);
            context.routeData = routerManager.getProps(location.pathname);
          }
        }
        console.log('SET', path, guardStatus);
        setStatusAndPath(guardStatus);
      }
    })();
  }, [location.pathname]);
  // useEffect(() => {
  //   console.log(path);
  // }, []);

  if ([status].includes(ExtentedRouterStatus.SUCCESS)) {
    console.log('RENDER' + path);
    return (
      <RouteContext.Provider value={{
        parent: new ParentRoute(path),
        outlet: children,
        routeData: {},
        guardStatus: status || ExtentedRouterStatus.INITIAL,
      }}>
        <RouteContext.Consumer>
          {() => (
            <Route
              key={setKey(path)}
              exact={exact}
              path={path}
              render={() => <Component></Component>}>
            </Route>
          )}
        </RouteContext.Consumer>
      </RouteContext.Provider>
    );
  }
  ;

  if (status === ExtentedRouterStatus.FAIL) {
    return <Redirect to={routerManager.getRedirectUrl()}/>;
  }

  return null;


  // const routerManager = useManager({resolvers, guards, pathname: location.pathname, redirectUrl});
  // const [status, setStatus] = useState(ExtentedRouterStatus.INITIAL);
  //
  // useEffect(() => {
  //   (async () => {
  //     const isMatch = isPathMatched(location.pathname, path);
  //     if (isMatch) {
  //       const guardStatus = await routerManager.checkGuards(location.pathname);
  //       if (guardStatus === ExtentedRouterStatus.SUCCESS) {
  //         if (pageTitle && ) {
  //           console.log(pageTitle);
  //           titleSubject.next(pageTitle);
  //         }
  //         if (Object.keys(resolvers).length) {
  //           await routerManager.loadResolvers(location.pathname);
  //         }
  //       }
  //
  //       setStatus(guardStatus);
  //     }
  //   })();
  // }, [location.pathname]);
  // if (status === ExtentedRouterStatus.SUCCESS) {
  // return (
  //   <>
  //     <Route
  //       key={setKey(path)}
  //       exact={exact}
  //       path={path}
  //       render={() => {
  //         // if (redirectToChild !== undefined && childs.length) {
  //         //   const lastIndex = redirectToChild.lastIndexOf('/');
  //         //
  //         //   const onlyChildPath = redirectToChild.slice(lastIndex, redirectToChild.length);
  //         //   const parentPath = redirectToChild.split(onlyChildPath)[0];
  //         //
  //         //   const pattern = new UrlPattern(parentPath);
  //         //   const match = pattern.match(location.pathname);
  //         //   const finalUrl = location.pathname + onlyChildPath;
  //         //
  //         //   if (match && location.pathname !== finalUrl) {
  //         //     props.history.replace(finalUrl);
  //         //     return;
  //         //   }
  //         // }
  //         return (
  //           <Component
  //             childRoutes={childs.map(route => (
  //               <ExtendedRouter
  //                 {...route}
  //                 key={setKey(route.path)}
  //                 redirectUrl={route.redirectUrl}
  //                 location={location}
  //               />
  //             ))}
  //           />
  //         );
  //       }}
  //     />
  //   </>
  // );
  // }

  // if (status === ExtentedRouterStatus.FAIL) {
  //   return <Redirect to={routerManager.getRedirectUrl()}/>;
  // }

  // return null;
};
// export const RouteContext = React.createContext({
//   parentPath: '',
// });
// export const Parent = (url: string) => {
//   return (
//     <RouteContext.Provider value={{ parentPath: url }}>
//       <h2>Hi! {url}</h2>;
//     </RouteContext.Provider>
//   );
//
// };
// export const RenderUrlFromParentPlusChild = (childUrl: string) => {
//   return (
//     <RouteContext.Consumer>
//       {value => (<h1>Child {value.parentPath} {childUrl}</h1>)}
//     </RouteContext.Consumer>
//   );
// };

// export

export const ChildRoutes = () => {
  // return <h2></h2>;
  const context = React.useContext(RouteContext);
  const location = useLocation();
  if (context.parent.path !== location.pathname) {
    return context.outlet;
  }
  return null;
};

export const useResolver = () => {
  return React.useContext(RouteContext).routeData;
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
