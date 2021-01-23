import React, { FunctionComponent } from 'react';
import { ExtendedRouterProps } from './types';
export declare const RouteContext: React.Context<{
    parent: any;
    outlet: any;
    routeResolverInfos: any;
}>;
export declare const ExtendedRouter: FunctionComponent<ExtendedRouterProps>;
export declare const ChildRoutes: () => any;
export declare const useResolver: () => any;
