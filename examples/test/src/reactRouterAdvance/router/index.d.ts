import React, { FunctionComponent } from 'react';
import { ExtendedRouterProps, ExtentedRouterStatus } from './types';
declare class ParentRoute {
    private parentRoute;
    constructor(parentRoute: string);
    get path(): string;
}
export declare const RouteContext: React.Context<{
    parent: ParentRoute;
    guardStatus: ExtentedRouterStatus;
    outlet: null;
    routeData: {};
}>;
export declare const ExtendedRouter: FunctionComponent<ExtendedRouterProps>;
export declare const ChildRoutes: () => null;
export declare const useResolver: () => {};
export {};
