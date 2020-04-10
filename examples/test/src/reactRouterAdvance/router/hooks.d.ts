import { PropsResolvers, ExtendedRouterProps, RouterPath, Guard, ExtentedRouterStatus } from './types';
interface UserManager {
    resolvers: PropsResolvers;
    guards: Guard[];
}
interface LoadingManager {
    childs: ExtendedRouterProps[];
    currentPath: string;
    path: RouterPath;
}
export declare function useLoadingManager(): {
    setPath: ({ currentPath, path, childs }: LoadingManager) => void;
    loadingDone: (path: RouterPath) => void;
    isLoading: () => boolean;
    pathIsLoading: (path: RouterPath) => void;
    setParentLoadingActive: () => void;
    isParentLoadingActive: () => boolean;
};
export declare function useManager({ resolvers, guards }: UserManager): {
    loadResolvers: () => Promise<void>;
    getProps: () => {};
    checkGuards: () => Promise<ExtentedRouterStatus>;
};
export declare function useTimer(): {
    startTimer: (debounceWaitTime: number, cb: () => any) => void;
    clearTimer: () => void;
};
export declare function usePathCollector(): {
    addPath: (path: string) => void;
    pathHasParent: () => boolean;
    getLoadingTime: (path: string) => number;
};
export {};
