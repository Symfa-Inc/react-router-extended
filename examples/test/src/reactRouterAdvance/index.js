/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { matchPath, Route, Redirect } from 'react-router-dom';
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
    ExtentedRouterStatus[ExtentedRouterStatus["INITIAL"] = 0] = "INITIAL";
    ExtentedRouterStatus[ExtentedRouterStatus["SUCCESS"] = 1] = "SUCCESS";
    ExtentedRouterStatus[ExtentedRouterStatus["FAIL"] = 2] = "FAIL";
})(ExtentedRouterStatus || (ExtentedRouterStatus = {}));

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
    function loadResolvers(pathname) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, promises, resultOfResolvers, props;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = Object.keys(infoAboutComponent.current[pathname].resolvers).map(function (resolverKey) { return resolverKey; });
                        promises = Object.keys(infoAboutComponent.current[pathname].resolvers).map(function (resolverKey) {
                            return infoAboutComponent.current[pathname].resolvers[resolverKey].resolve();
                        });
                        return [4 /*yield*/, Promise.all(promises).catch(function (e) {
                                console.error('Error in resolvers');
                                console.error(e);
                            })];
                    case 1:
                        resultOfResolvers = _b.sent();
                        props = resultOfResolvers.reduce(function (acc, next, index) {
                            var _a;
                            var key = keys[index];
                            return __assign(__assign({}, acc), (_a = {}, _a[key] = next, _a));
                        }, {});
                        infoAboutComponent.current = __assign(__assign({}, infoAboutComponent.current), (_a = {}, _a[pathname] = __assign(__assign({}, infoAboutComponent.current[pathname]), { props: props }), _a));
                        return [2 /*return*/];
                }
            });
        });
    }
    function getProps(pathname) {
        return infoAboutComponent.current[pathname].props;
    }
    function getRedirectUrl() {
        if (infoAboutComponent.current[pathname].redirectUrl) {
            return infoAboutComponent.current[pathname].redirectUrl;
        }
        return '/';
    }
    return { loadResolvers: loadResolvers, getProps: getProps, checkGuards: checkGuards, getRedirectUrl: getRedirectUrl };
}

var sleep = function (t) { return new Promise(function (res) { return setTimeout(function () { return res(); }, t); }); };
var checkIfPathIsUndefined = function (path) {
    if (typeof path === 'undefined') {
        throw new Error("Path for component is undefined. Please provide path");
    }
};
var isMatch = function (basePath, path) {
    var match = matchPath(basePath, {
        path: path,
        exact: false,
        strict: true,
    });
    var pattern = new UrlPattern(path);
    var isChildNestedRoute = pattern.match(basePath.slice(0, basePath.lastIndexOf('/')));
    return (match && match.isExact) || basePath.startsWith(path) || isChildNestedRoute;
};
var isPathMatched = function (basePath, path) {
    checkIfPathIsUndefined(path);
    if (Array.isArray(path)) {
        var matchArray = path.map(function (pt) { return isMatch(basePath, pt); });
        return matchArray.some(function (match) { return match === true; });
    }
    return isMatch(basePath, path);
};
var setKey = function (path) {
    checkIfPathIsUndefined(path);
    if (Array.isArray(path)) {
        return path.join();
    }
    return path;
};

var ExtendedRouter = function (_a) {
    var path = _a.path, Component = _a.component, redirectUrl = _a.redirectUrl, _b = _a.guards, guards = _b === void 0 ? [] : _b, _c = _a.resolvers, resolvers = _c === void 0 ? {} : _c, _d = _a.childs, childs = _d === void 0 ? [] : _d, redirectToChild = _a.redirectToChild, exact = _a.exact, location = _a.location;
    if (typeof location === 'undefined') {
        throw new Error('Extended router must be wrapper in usual router!');
    }
    var routerManager = useManager({ resolvers: resolvers, guards: guards, pathname: location.pathname, redirectUrl: redirectUrl });
    var _e = useState(ExtentedRouterStatus.INITIAL), status = _e[0], setStatus = _e[1];
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var isMatch, guardStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isMatch = isPathMatched(location.pathname, path);
                        if (!isMatch) return [3 /*break*/, 4];
                        return [4 /*yield*/, routerManager.checkGuards(location.pathname)];
                    case 1:
                        guardStatus = _a.sent();
                        if (!(guardStatus === ExtentedRouterStatus.SUCCESS && Object.keys(resolvers).length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, routerManager.loadResolvers(location.pathname)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        setStatus(guardStatus);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    }, [location.pathname]);
    if (status === ExtentedRouterStatus.SUCCESS) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Route, { key: setKey(path), exact: exact, path: path, render: function (props) {
                    if (redirectToChild !== undefined && childs.length) {
                        var lastIndex = redirectToChild.lastIndexOf('/');
                        var onlyChildPath = redirectToChild.slice(lastIndex, redirectToChild.length);
                        var parentPath = redirectToChild.split(onlyChildPath)[0];
                        var pattern = new UrlPattern(parentPath);
                        var match = pattern.match(location.pathname);
                        var finalUrl = location.pathname + onlyChildPath;
                        if (match && location.pathname !== finalUrl) {
                            props.history.replace(finalUrl);
                            return;
                        }
                    }
                    return (React.createElement(Component, __assign({}, props, routerManager.getProps(location.pathname), { childRoutes: childs.map(function (route) { return (React.createElement(ExtendedRouter, __assign({}, route, { key: setKey(route.path), redirectUrl: route.redirectUrl, location: location }))); }) })));
                } })));
    }
    if (status === ExtentedRouterStatus.FAIL) {
        return React.createElement(Redirect, { to: routerManager.getRedirectUrl() });
    }
    return null;
};

export { ExtendedRouter, sleep };
