import { ElementType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
export declare type RouterPath = string | string[] | undefined;
export interface ExtendedRouterProps {
  path: RouterPath;
  component: ElementType;
  redirectUrl?: string;
  guards?: Guard[];
  resolvers?: PropsResolvers;
  debounceWaitTime?: number;
  childs?: ExtendedRouterProps[];
  redirectToChild?: string | boolean;
  exact?: boolean;
  location?: any;
}
export declare enum ExtentedRouterStatus {
  INITIAL = 0,
  LOADING = 1,
  SUCCESS = 2,
  FAIL = 3,
}
export interface PropsResolvers {
  [index: string]: Resolver;
}
export interface Guard {
  canActivate(): Promise<boolean> | boolean;
}
export interface Resolver {
  resolve(): Promise<void> | void;
}
export interface InitializeRouter {
  loading?: any;
}
export declare type Props = RouteComponentProps & ExtendedRouterProps;
