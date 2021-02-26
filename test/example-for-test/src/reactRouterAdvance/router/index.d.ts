import React, { FunctionComponent } from 'react';
import { ExtendedRouteProps } from './types';
export declare const RouteContext: React.Context<{
    parent: any;
    outlet: any;
    routeResolverInfos: any;
}>;
export declare const ExtendedRoute: FunctionComponent<ExtendedRouteProps>;
export declare const ChildRoutes: () => any;
export declare function useResolver<T = any>(): T;
