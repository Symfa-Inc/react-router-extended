import { PropsResolvers, Guard, ExtentedRouterStatus } from './types';
interface UserManager {
    resolvers: PropsResolvers;
    guards: Guard[];
    pathname: string;
    redirectUrl?: string;
}
export declare function useManager({ resolvers, guards, pathname, redirectUrl }: UserManager): {
    loadResolvers: (pathname: string) => Promise<void>;
    getProps: (pathname: string) => any;
    checkGuards: (pathname: string) => Promise<ExtentedRouterStatus>;
    getRedirectUrl: () => string;
};
export {};
