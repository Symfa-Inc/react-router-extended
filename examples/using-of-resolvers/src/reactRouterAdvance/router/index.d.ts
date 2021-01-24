import React, { FunctionComponent } from 'react';
import { ExtendedRouterProps } from './types';
export declare const RouteContext: React.Context<{
    parent: any;
    outlet: any;
    routeResolverInfos: any;
}>;
export declare const ExtendedRouter: FunctionComponent<Omit<ExtendedRouterProps, 'setResolverInfo' | 'setGuardStatus' | 'status'>>;
export declare const ChildRoutes: () => any;
export declare function useResolver<T = any>(): T;
