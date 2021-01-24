import { RouterPath } from './types';

export const sleep = (t: number) => new Promise(res => setTimeout(() => res(), t));

export const isNullOrUndefined = (value: any): boolean => value === null || value === undefined;

const checkIfPathIsUndefined = (path: RouterPath) => {
  if (isNullOrUndefined(path)) {
    throw new Error(`Path for component is undefined. Please provide path`);
  }
};

export const setKey = (path: RouterPath): string => {
  checkIfPathIsUndefined(path);

  if (Array.isArray(path)) {
    return path.join();
  }
  return path as string;
};
