import React, { ElementType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
export declare type RouterPath = string | string[] | undefined;
export interface ExtendedRouteProps {
    path: string;
    component: ElementType;
    redirectUrl?: string;
    guards?: Guard[];
    resolvers?: PropsResolvers;
    exact?: boolean;
    children?: React.ReactNode;
}
export interface InnerExtendedRouteProps {
    path: string;
    component: ElementType;
    redirectUrl?: string;
    guards?: Guard[];
    resolvers?: PropsResolvers;
    exact?: boolean;
    children?: React.ReactNode;
    setResolverInfo: (data: any) => void;
    setGuardStatus: (status: ExtendedRouteStatus) => void;
    status: ExtendedRouteStatus;
}
export declare enum ExtendedRouteStatus {
    INITIAL = 1,
    SUCCESS = 2,
    FAIL = 3
}
export interface PropsResolvers {
    [index: string]: Resolver;
}
export interface Guard {
    canActivate(): Promise<boolean> | boolean;
    redirectUrl?: string;
}
export interface Resolver {
    resolve(): Promise<any> | any;
}
export declare type Props = RouteComponentProps & ExtendedRouteProps;
export interface ParentComponentWithChildRoutes {
    childRoutes: JSX.Element[];
}
