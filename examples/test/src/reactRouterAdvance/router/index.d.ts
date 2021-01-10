import React, { FunctionComponent } from 'react';
import { ExtendedRouterProps } from './types';
export declare const RouteContext: React.Context<{
    parentPath: string;
    children: null;
}>;
export declare const ExtendedRouter: FunctionComponent<ExtendedRouterProps>;
export declare const ChildRoutes: () => null;
