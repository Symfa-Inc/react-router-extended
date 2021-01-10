/* eslint-disable */
import React from 'react';
import { Route } from 'react-router-dom';
import 'url-pattern';

var ExtentedRouterStatus;
(function (ExtentedRouterStatus) {
    ExtentedRouterStatus[ExtentedRouterStatus["INITIAL"] = 0] = "INITIAL";
    ExtentedRouterStatus[ExtentedRouterStatus["SUCCESS"] = 1] = "SUCCESS";
    ExtentedRouterStatus[ExtentedRouterStatus["FAIL"] = 2] = "FAIL";
})(ExtentedRouterStatus || (ExtentedRouterStatus = {}));
//# sourceMappingURL=types.js.map

var sleep = function (t) { return new Promise(function (res) { return setTimeout(function () { return res(); }, t); }); };
var checkIfPathIsUndefined = function (path) {
    if (typeof path === 'undefined') {
        throw new Error("Path for component is undefined. Please provide path");
    }
};
var setKey = function (path) {
    checkIfPathIsUndefined(path);
    if (Array.isArray(path)) {
        return path.join();
    }
    return path;
};
//# sourceMappingURL=helpers.js.map

var RouteContext = React.createContext({
    parentPath: '',
    // outlet: null,
    children: null,
});
var ExtendedRouter = function (_a) {
    // if (typeof location === 'undefined') {
    //   throw new Error('Extended router must be wrapper in usual router!');
    // }
    var path = _a.path, Component = _a.component, 
    // redirectUrl,
    // guards = [],
    // resolvers = {},
    // childs = [],
    // redirectToChild,
    exact = _a.exact, 
    // location,
    children = _a.children;
    // return (
    //   <RouteContext.Provider value={{ parentPath: path, children: children }}>
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
    return (React.createElement(RouteContext.Provider, { value: { parentPath: path, children: children } },
        React.createElement(RouteContext.Consumer, null, function () { return (React.createElement(Route, { key: setKey(path), exact: exact, path: path, render: function () { return React.createElement(Component, null); } })); })));
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
var ChildRoutes = function () {
    // return <h2></h2>;
    return React.useContext(RouteContext).children;
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

export { ChildRoutes, ExtendedRouter, sleep };
