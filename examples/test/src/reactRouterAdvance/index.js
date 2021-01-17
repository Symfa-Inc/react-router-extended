/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import * as UrlPattern from 'url-pattern';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ExtentedRouterStatus;
(function (ExtentedRouterStatus) {
    ExtentedRouterStatus[ExtentedRouterStatus["INITIAL"] = 1] = "INITIAL";
    ExtentedRouterStatus[ExtentedRouterStatus["SUCCESS"] = 2] = "SUCCESS";
    ExtentedRouterStatus[ExtentedRouterStatus["FAIL"] = 3] = "FAIL";
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
var isPathTheSame = function (currentLocationPath, componentPath) {
    var pattern = new UrlPattern(componentPath);
    return pattern.match(currentLocationPath) !== null;
    // const isMultiPath = componentPath.includes('/');
    // const isPathWithParams = componentPath;
    // if (isMultiPath) {
    //
    // }
    // return false;
};
//# sourceMappingURL=helpers.js.map

function useManager(_a) {
    var resolvers = _a.resolvers, guards = _a.guards, pathname = _a.pathname, redirectUrl = _a.redirectUrl;
    var infoAboutComponent = useRef({});
    if (!infoAboutComponent.current[pathname]) {
        infoAboutComponent.current[pathname] = {
            resolvers: resolvers,
            guards: guards,
            pathname: pathname,
            props: {},
            redirectUrl: redirectUrl
        };
    }
    function checkGuards(pathname) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, guard, hasFailInGuard, guardResult, e_1, firstFailedGuard;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = [];
                        _i = 0, _a = infoAboutComponent.current[pathname].guards;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        guard = _a[_i];
                        hasFailInGuard = result.some(function (r) { return !r.isOk; });
                        if (hasFailInGuard) {
                            return [3 /*break*/, 5];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, guard.canActivate()];
                    case 3:
                        guardResult = _b.sent();
                        result.push({ isOk: guardResult, redirectUrl: guard.redirectUrl });
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        result.push({ isOk: false, redirectUrl: guard.redirectUrl });
                        console.error('Error in guards');
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        firstFailedGuard = result.find(function (r) { return !r.isOk; });
                        if (firstFailedGuard && firstFailedGuard.redirectUrl) {
                            infoAboutComponent.current[pathname] = __assign(__assign({}, infoAboutComponent.current[pathname]), { redirectUrl: firstFailedGuard.redirectUrl });
                        }
                        return [2 /*return*/, !firstFailedGuard ? ExtentedRouterStatus.SUCCESS : ExtentedRouterStatus.FAIL];
                }
            });
        });
    }
    function loadResolvers() {
        return __awaiter(this, void 0, void 0, function () {
            var keys, promises, resultOfResolvers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(resolvers).map(function (resolverKey) { return resolverKey; });
                        promises = Object.keys(resolvers).map(function (resolverKey) {
                            return resolvers[resolverKey].resolve();
                        });
                        return [4 /*yield*/, Promise.all(promises).catch(function (e) {
                                console.error('Error in resolvers');
                                console.error(e);
                            })];
                    case 1:
                        resultOfResolvers = _a.sent();
                        return [2 /*return*/, resultOfResolvers.reduce(function (acc, next, index) {
                                var _a;
                                var key = keys[index];
                                return __assign(__assign({}, acc), (_a = {}, _a[key] = next, _a));
                            }, {})];
                }
            });
        });
    }
    // function getProps(pathname: string) {
    //   return infoAboutComponent.current[pathname].props;
    // }
    function getRedirectUrl() {
        if (infoAboutComponent.current[pathname].redirectUrl) {
            return infoAboutComponent.current[pathname].redirectUrl;
        }
        return '/';
    }
    return { loadResolvers: loadResolvers, checkGuards: checkGuards, getRedirectUrl: getRedirectUrl };
}
//# sourceMappingURL=hooks.js.map

var ParentRoute = /** @class */ (function () {
    function ParentRoute(parentRoute) {
        this.parentRoute = parentRoute;
    }
    Object.defineProperty(ParentRoute.prototype, "path", {
        get: function () {
            return this.parentRoute;
        },
        enumerable: true,
        configurable: true
    });
    return ParentRoute;
}());
var RouteContext = React.createContext({
    parent: new ParentRoute(''),
    // guardStatus: ExtentedRouterStatus.INITIAL,
    outlet: null,
    routeData: {},
});
var ExtendedRouter = function (props) {
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
    var _a = useState({}), resolverInfo = _a[0], setResolverInfo = _a[1];
    var _b = useState(ExtentedRouterStatus.INITIAL), status = _b[0], setGuardStatus = _b[1];
    // const location = useLocation();
    useEffect(function () {
        var _a;
        // const isExactPath = isPathTheSame(location.pathname, props.path);
        // if (isComponentPathMatched) {
        // if() {
        // console.log(`Stored path: ${storedPath} currentPath: ${path}`);
        // let currentRouteStatus = status;
        // console.log('PATH', path, 'stored' + storedPath);
        // const isNotOldCachedResult = status === ExtentedRouterStatus.SUCCESS;
        // const isDirectRouteAndGuardAlreadyWorked =
        //   status === ExtentedRouterStatus.SUCCESS && storedPath !== '' && isPathTheSame(location.pathname, storedPath);
        // const hasGuardOrResolvers = props.resolvers !== undefined && !props.guards?.length && Object.values(props.resolvers).length !== 0;
        // if (
        //   isNotOldCachedResult && isExactPath &&
        //   ((props.resolvers !== undefined && Object.values(props.resolvers).length !== 0) || props.guards?.length)
        // ) {
        //   // status = ExtentedRouterStatus.INITIAL;
        //   // console.log('INITIAL STATUS WAS SETTED', props.path);
        //   setGuardStatus(ExtentedRouterStatus.INITIAL);
        // }
        // const isExactPath = isPathTheSame(location.pathname, props.path);
        // if (
        //   status === ExtentedRouterStatus.SUCCESS && isExactPath &&
        //   ((props.resolvers !== undefined && Object.values(props.resolvers).length !== 0) || props.guards?.length)
        // ) {
        //   // status = ExtentedRouterStatus.INITIAL;
        //   // console.log('INITIAL STATUS WAS SETTED', props.path);
        //   setGuardStatus(ExtentedRouterStatus.INITIAL);
        // }
        if (props.resolvers !== undefined && !((_a = props.guards) === null || _a === void 0 ? void 0 : _a.length) && Object.values(props.resolvers).length === 0) {
            // console.log('!guards?.length && !Object.values(resolvers).length)', props.path);
            setGuardStatus(ExtentedRouterStatus.SUCCESS);
        }
        // }
    }, [location.pathname]);
    return (React.createElement(Route, { key: setKey(props.path), exact: props.exact, path: props.path, render: function () { return React.createElement(RouteContext.Provider, { value: {
                parent: new ParentRoute(props.path),
                outlet: props.children,
                routeData: resolverInfo,
            } },
            React.createElement(RouteContext.Consumer, null, function () { return (React.createElement(InnerExtendedRouter, __assign({}, props, { setResolverInfo: setResolverInfo, setGuardStatus: setGuardStatus, status: status }))); })); } }));
    // }
    // ;
    // if (context.guardStatus === ExtentedRouterStatus.FAIL) {
    //   return <Redirect to={routerManager.getRedirectUrl()}/>;
    // }
    //
    // return null;
};
var InnerExtendedRouter = function (_a) {
    var path = _a.path, Component = _a.component, redirectUrl = _a.redirectUrl, _b = _a.guards, guards = _b === void 0 ? [] : _b, _c = _a.resolvers, resolvers = _c === void 0 ? {} : _c, 
    // childs = [],
    // redirectToChild,
    // exact,
    // location,
    // children,
    setResolverInfo = _a.setResolverInfo, setGuardStatus = _a.setGuardStatus, status = _a.status;
    var location = useLocation();
    var context = React.useContext(RouteContext);
    var routerManager = useManager({ resolvers: resolvers, guards: guards, pathname: location.pathname, redirectUrl: redirectUrl });
    // const [status, setStatus] = useState(context.guardStatus);
    // const [storedPath, storePath] = useState<string>(path);
    // const [lastUpdateTime, forceUpdate] = useState(Date.now());
    // console.log('INITIAL STATUS', status, path);
    var setStatusAndPath = function (status) {
        setGuardStatus(status);
        // storePath(path);
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
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var isExactPath, routeStatus, needToLoadExtraInfoForComponent, guardStatus, resolverData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isExactPath = isPathTheSame(location.pathname, path);
                        routeStatus = status;
                        if (status === ExtentedRouterStatus.SUCCESS && isExactPath &&
                            ((resolvers !== undefined && Object.values(resolvers).length !== 0) || (guards === null || guards === void 0 ? void 0 : guards.length))) {
                            routeStatus = ExtentedRouterStatus.INITIAL;
                            // console.log('INITIAL STATUS WAS SETTED', props.path);
                            setGuardStatus(ExtentedRouterStatus.INITIAL);
                        }
                        console.log("INIT: " + path);
                        needToLoadExtraInfoForComponent = routeStatus === ExtentedRouterStatus.INITIAL;
                        console.log("status: " + status + " path: " + path);
                        if (!needToLoadExtraInfoForComponent) return [3 /*break*/, 4];
                        return [4 /*yield*/, routerManager.checkGuards(location.pathname)];
                    case 1:
                        guardStatus = _a.sent();
                        if (!(guardStatus === ExtentedRouterStatus.SUCCESS || !(guards === null || guards === void 0 ? void 0 : guards.length))) return [3 /*break*/, 3];
                        if (!Object.keys(resolvers).length) return [3 /*break*/, 3];
                        return [4 /*yield*/, routerManager.loadResolvers()];
                    case 2:
                        resolverData = _a.sent();
                        setResolverInfo(resolverData);
                        _a.label = 3;
                    case 3:
                        setStatusAndPath(guardStatus);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    console.log("Status: " + status + " path: " + path);
    // useEffect(() => {
    //   console.log(path);
    // }, []);
    if ([status].includes(ExtentedRouterStatus.SUCCESS)) {
        console.log('RENDER' + path);
        return (React.createElement(Component, null)
        // <RouteContext.Provider value={{
        //   parent: new ParentRoute(path),
        //   outlet: children,
        //   routeData: resolverInfo,
        //   guardStatus: status,
        // }}>
        //   <RouteContext.Consumer>
        //     {() => (
        // <Route
        //   key={setKey(path)}
        //   exact={exact}
        //   path={path}
        //   render={() => <Component></Component>}>
        // </Route>
        //     )}
        //   </RouteContext.Consumer>
        // </RouteContext.Provider>
        );
    }
    if (status === ExtentedRouterStatus.FAIL) {
        return React.createElement(Redirect, { to: routerManager.getRedirectUrl() });
    }
    return null;
};
var ChildRoutes = function () {
    var context = React.useContext(RouteContext);
    var location = useLocation();
    if (context.parent.path !== location.pathname) {
        return context.outlet;
    }
    return null;
};
var useResolver = function () {
    var context = React.useContext(RouteContext);
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

export { ChildRoutes, ExtendedRouter, sleep, useResolver };
