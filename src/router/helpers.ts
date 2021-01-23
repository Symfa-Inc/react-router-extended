import { ExtendedRouterStatus, Guard, RouterPath } from './types';

export const sleep = (t: number) => new Promise(res => setTimeout(() => res(), t));

export const isNullOrUndefined = (value: any): boolean => value === null || value === undefined;

const checkIfPathIsUndefined = (path: RouterPath) => {
  if (isNullOrUndefined(path)) {
    throw new Error(`Path for component is undefined. Please provide path`);
  }
};

export const checkGuards = async (guards: Guard[]): Promise<ExtendedRouterStatus> => {
  const result = [];
  for (const guard of guards) {
    try {
      const guardResult = await guard.canActivate();
      result.push(guardResult);
    } catch (e) {
      result.push(false);
      console.error('Error in guards');
      console.error(e);
    }
  }
  const isOk = !result.some(i => !i);

  return isOk ? ExtendedRouterStatus.SUCCESS : ExtendedRouterStatus.FAIL;
};

export const setKey = (path: RouterPath): string => {
  checkIfPathIsUndefined(path);

  if (Array.isArray(path)) {
    return path.join();
  }
  return path as string;
};
