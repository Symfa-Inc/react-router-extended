import { PropsResolvers, Guard, ExtentedRouterStatus } from './types';
interface UserManager {
    resolvers: PropsResolvers;
    guards: Guard[];
    pathname: string;
}
export declare function useManager({ resolvers, guards, pathname }: UserManager): {
    loadResolvers: (pathname: string) => Promise<void>;
    getProps: (pathname: string) => any;
    checkGuards: (pathname: string) => Promise<ExtentedRouterStatus>;
};
export {};
