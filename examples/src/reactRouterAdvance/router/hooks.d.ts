import { PropsResolvers, Guard, ExtentedRouterStatus } from './types';
interface UserManager {
    resolvers: PropsResolvers;
    guards: Guard[];
}
export declare function useManager({ resolvers, guards }: UserManager): {
    loadResolvers: () => Promise<void>;
    getProps: () => {};
    checkGuards: () => Promise<ExtentedRouterStatus>;
};
export {};
