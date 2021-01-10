import { ElementType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
export declare type RouterPath = string | string[] | undefined;
export interface ExtendedRouterProps {
    path: string;
    component: ElementType;
    redirectUrl?: string;
    guards?: Guard[];
    resolvers?: PropsResolvers;
    childs?: ExtendedRouterProps[];
    redirectToChild?: string;
    exact?: boolean;
    pageTitle?: string;
    location?: Location;
    children?: any;
}
export declare enum ExtentedRouterStatus {
    INITIAL = 0,
    SUCCESS = 1,
    FAIL = 2
}
export interface PropsResolvers {
    [index: string]: Resolver;
}
export interface Guard {
    canActivate(): Promise<boolean> | boolean;
    redirectUrl?: string;
}
export interface Resolver {
    resolve(): Promise<void> | void;
}
export declare type Props = RouteComponentProps & ExtendedRouterProps;
export interface ParentComponentWithChildRoutes {
    childRoutes: JSX.Element[];
}
