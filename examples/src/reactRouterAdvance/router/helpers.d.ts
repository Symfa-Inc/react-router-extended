import { ExtentedRouterStatus, Guard, RouterPath, ExtendedRouterProps } from './types';
export declare const sleep: (t: number) => Promise<unknown>;
export declare const checkGuards: (guards: Guard[]) => Promise<ExtentedRouterStatus>;
export declare const isChildPathStartWithParent: (parentPath: RouterPath, childPath: RouterPath) => boolean;
export declare const isPathMatched: (basePath: string, path: RouterPath) => boolean;
export declare const setKey: (path: RouterPath) => string;
export declare const getAllMatchedRoutes: (currentPath: string, extendedRoutes: ExtendedRouterProps[]) => ExtendedRouterProps[];
interface RouterHelper extends ExtendedRouterProps {
    currentPath: string;
}
export declare const routeHelper: ({ path, childs, currentPath, }: RouterHelper) => {
    hasChildren: () => boolean;
    isFinalRoute: () => boolean;
};
export {};
