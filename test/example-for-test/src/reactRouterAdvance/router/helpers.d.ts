import { ExtentedRouterStatus, Guard, RouterPath } from './types';
export declare const sleep: (t: number) => Promise<unknown>;
export declare const isNullOrUndefined: (value: any) => boolean;
export declare const checkGuards: (guards: Guard[]) => Promise<ExtentedRouterStatus>;
export declare const setKey: (path: RouterPath) => string;
