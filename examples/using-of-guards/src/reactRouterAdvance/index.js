/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { matchPath } from 'react-router';
import { Route, useLocation, Redirect } from 'react-router-dom';

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

var sleep = function (t) { return new Promise(function (res) { return setTimeout(function () { return res(); }, t); }); };
var isNullOrUndefined = function (value) { return value === null || value === undefined; };
var checkIfPathIsUndefined = function (path) {
    if (isNullOrUndefined(path)) {
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

var ExtendedRouterStatus;
(function (ExtendedRouterStatus) {
    ExtendedRouterStatus[ExtendedRouterStatus["INITIAL"] = 1] = "INITIAL";
    ExtendedRouterStatus[ExtendedRouterStatus["SUCCESS"] = 2] = "SUCCESS";
    ExtendedRouterStatus[ExtendedRouterStatus["FAIL"] = 3] = "FAIL";
})(ExtendedRouterStatus || (ExtendedRouterStatus = {}));

function useManager(_a) {
    var resolvers = _a.resolvers, guards = _a.guards, pathname = _a.pathname, redirectUrl = _a.redirectUrl;
    var infoAboutComponent = useRef({});
    if (!infoAboutComponent.current[pathname]) {
        infoAboutComponent.current[pathname] = {
            resolvers: resolvers,
            guards: guards,
            pathname: pathname,
            props: {},
            redirectUrl: redirectUrl,
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
                        return [2 /*return*/, !firstFailedGuard ? ExtendedRouterStatus.SUCCESS : ExtendedRouterStatus.FAIL];
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
                        promises = Object.keys(resolvers).map(function (resolverKey) { return resolvers[resolverKey].resolve(); });
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

var RouteCollector = /** @class */ (function () {
    function RouteCollector(currentRouteController, parentRoute) {
        this.currentRouteController = currentRouteController;
        this.parentRoute = parentRoute;
        this.children = [];
    }
    Object.defineProperty(RouteCollector.prototype, "path", {
        get: function () {
            return this.currentRouteController;
        },
        enumerable: true,
        configurable: true
    });
    RouteCollector.prototype.addChildRoute = function (childRoute) {
        this.children.push(childRoute);
    };
    RouteCollector.prototype.getFullPathForChild = function (childrenPath) {
        var parentPath = this.getFullPathForRoute();
        return parentPath + childrenPath;
    };
    RouteCollector.prototype.getChildRouteByPath = function (childPath) {
        return this.children.find(function (cr) { return cr.path === childPath; });
    };
    RouteCollector.prototype.getFullPathForRoute = function () {
        var _a;
        var parentRoute = (!isNullOrUndefined(this.parentRoute) ? (_a = this.parentRoute) === null || _a === void 0 ? void 0 : _a.getFullPathForRoute() : '');
        var normalizedParentPath = parentRoute === this.path ? '' : parentRoute;
        return "" + normalizedParentPath + this.path;
    };
    return RouteCollector;
}());
var RouteContext = React.createContext({
    parent: null,
    outlet: null,
    routeResolverInfos: {},
});
var ExtendedRouter = function (props) {
    var context = React.useContext(RouteContext);
    var _a = useState({}), resolverInfo = _a[0], setResolverInfo = _a[1];
    var _b = useState(ExtendedRouterStatus.INITIAL), status = _b[0], setGuardStatus = _b[1];
    var _c = useState(), storedPath = _c[0], setPath = _c[1];
    var setStatusAndPath = function (newStatus) {
        setGuardStatus(newStatus);
        setPath(props.path);
    };
    useEffect(function () {
        var _a;
        if (props.resolvers !== undefined && !((_a = props.guards) === null || _a === void 0 ? void 0 : _a.length) && Object.values(props.resolvers).length === 0) {
            setStatusAndPath(ExtendedRouterStatus.SUCCESS);
        }
    }, [location.pathname]);
    var parentRoute = context.parent;
    var currentRouteController = new RouteCollector(props.path, !isNullOrUndefined(parentRoute) ? parentRoute : new RouteCollector(props.path, null));
    if (parentRoute) {
        var currentRouteInParentRoute = parentRoute.getChildRouteByPath(props.path);
        if (!isNullOrUndefined(currentRouteInParentRoute)) {
            currentRouteController = currentRouteInParentRoute;
        }
        else {
            parentRoute.addChildRoute(currentRouteController);
        }
    }
    var componentPath = !isNullOrUndefined(parentRoute) ? parentRoute.getFullPathForChild(props.path) : props.path;
    return (React.createElement(Route, { key: setKey(componentPath), exact: !isNullOrUndefined(props.children) ? false : props.exact, path: componentPath, render: function () { return (React.createElement(RouteContext.Provider, { value: {
                parent: currentRouteController,
                outlet: props.children,
                routeResolverInfos: resolverInfo,
            } },
            React.createElement(RouteContext.Consumer, null, function () { return (React.createElement(InnerExtendedRouter, __assign({}, props, { path: componentPath, setResolverInfo: setResolverInfo, setGuardStatus: setStatusAndPath, status: storedPath === props.path && !isNullOrUndefined(storedPath) ? status : ExtendedRouterStatus.INITIAL }))); }))); } }));
};
var InnerExtendedRouter = function (_a) {
    var path = _a.path, Component = _a.component, redirectUrl = _a.redirectUrl, _b = _a.guards, guards = _b === void 0 ? [] : _b, _c = _a.resolvers, resolvers = _c === void 0 ? {} : _c, setResolverInfo = _a.setResolverInfo, setGuardStatus = _a.setGuardStatus, status = _a.status;
    var location = useLocation();
    var routerManager = useManager({ resolvers: resolvers, guards: guards, pathname: location.pathname, redirectUrl: redirectUrl });
    var setStatusAndPath = function (status) {
        setGuardStatus(status);
    };
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var needToLoadExtraInfoForComponent, guardStatus, resolverData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        needToLoadExtraInfoForComponent = status === ExtendedRouterStatus.INITIAL;
                        if (!needToLoadExtraInfoForComponent) return [3 /*break*/, 4];
                        return [4 /*yield*/, routerManager.checkGuards(location.pathname)];
                    case 1:
                        guardStatus = _a.sent();
                        if (!(guardStatus === ExtendedRouterStatus.SUCCESS || !(guards === null || guards === void 0 ? void 0 : guards.length))) return [3 /*break*/, 3];
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
    }, [status]);
    var firstRenderRef = useRef(true);
    useEffect(function () {
        firstRenderRef.current = false;
    }, []);
    if (firstRenderRef.current) {
        if ([ExtendedRouterStatus.SUCCESS].includes(status) &&
            ((resolvers !== undefined && Object.values(resolvers).length !== 0) || (guards === null || guards === void 0 ? void 0 : guards.length))) {
            setGuardStatus(ExtendedRouterStatus.INITIAL);
        }
    }
    var hasGuardsOrResolvers = (!isNullOrUndefined(resolvers) && Object.values(resolvers).length !== 0) ||
        (Array.isArray(guards) && guards.length !== 0);
    var firstRenderCondition = hasGuardsOrResolvers ? !firstRenderRef.current : true;
    if (status == ExtendedRouterStatus.SUCCESS && firstRenderCondition) {
        return React.createElement(Component, null);
    }
    var redirectUrlIsSameAsCurrentPath = matchPath(redirectUrl || '', {
        path: path,
        exact: true,
        strict: false,
    });
    if (status === ExtendedRouterStatus.FAIL &&
        !isNullOrUndefined(redirectUrl) &&
        redirectUrl !== '' &&
        !redirectUrlIsSameAsCurrentPath) {
        return React.createElement(Redirect, { to: routerManager.getRedirectUrl() });
    }
    return null;
};
var ChildRoutes = function () {
    return React.useContext(RouteContext).outlet;
};
function useResolver() {
    return React.useContext(RouteContext).routeResolverInfos;
}

export { ChildRoutes, ExtendedRouter, sleep, useResolver };
