import { matchPath } from 'react-router-dom';
import * as UrlPattern from 'url-pattern';
import { ExtentedRouterStatus, Guard, RouterPath, ExtendedRouterProps, PropsResolvers } from './types';

export const sleep = (t: number) => new Promise(res => setTimeout(() => res(), t));

const checkIfPathIsUndefined = (path: RouterPath) => {
  if (typeof path === 'undefined') {
    throw new Error(`Path for component is undefined. Please provide path`);
  }
};

export const checkGuards = async (guards: Guard[]): Promise<ExtentedRouterStatus> => {
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

  return isOk ? ExtentedRouterStatus.SUCCESS : ExtentedRouterStatus.FAIL;
};

const isMatch = (basePath: string, path: string): boolean => {
  const match = matchPath(basePath, {
    path,
    exact: false,
    strict: true,
  });
  const pattern = new UrlPattern(path);
  const isChildNestedRoute = pattern.match(basePath.slice(0, basePath.lastIndexOf('/')));

  return (match && match.isExact) || basePath.startsWith(path) || isChildNestedRoute;
};

export const isChildPathStartWithParent = (parentPath: RouterPath, childPath: RouterPath) => {
  checkIfPathIsUndefined(childPath);
  checkIfPathIsUndefined(parentPath);

  if (Array.isArray(childPath) && Array.isArray(parentPath)) {
    return childPath.every(chPt => {
      const isOneOfParentPathMatched = parentPath.some(pPt => isMatch(pPt, chPt));

      return isOneOfParentPathMatched;
    });
  } else if (Array.isArray(parentPath) && !Array.isArray(childPath)) {
    return parentPath.some(pt => isMatch(pt, childPath as string));
  } else if (!Array.isArray(parentPath) && Array.isArray(childPath)) {
    return childPath.every(chPt => {
      const isOneOfParentPathMatched = isMatch(parentPath as string, chPt);

      return isOneOfParentPathMatched;
    });
  }
  return isMatch(parentPath as string, childPath as string);
};

export const isPathMatched = (basePath: string, path: RouterPath): boolean => {
  checkIfPathIsUndefined(path);

  if (Array.isArray(path)) {
    const matchArray = path.map(pt => isMatch(basePath, pt));

    return matchArray.some(match => match === true);
  }

  return isMatch(basePath, path as string);
};

export const setKey = (path: RouterPath): string => {
  checkIfPathIsUndefined(path);

  if (Array.isArray(path)) {
    return path.join();
  }
  return path as string;
};

const flatMapForChildren = (extendedRoutes: ExtendedRouterProps[]): ExtendedRouterProps[] => {
  const routes: ExtendedRouterProps[] = [];

  extendedRoutes.forEach(router => {
    routes.push(router);
    if (router.childs && router.childs.length) {
      routes.push(...flatMapForChildren(router.childs));
    }
  });
  return routes;
};

export const getAllMatchedRoutes = (
  currentPath: string,
  extendedRoutes: ExtendedRouterProps[],
): ExtendedRouterProps[] => {
  const routesFlatMap = flatMapForChildren(extendedRoutes);
  const routes = routesFlatMap.filter(router => isPathMatched(currentPath, router.path));
  return routes;
};

interface RouterHelper extends ExtendedRouterProps {
  currentPath: string;
}
export const routeHelper = ({
  path,
  // component: Component,
  // redirectUrl,
  // guards = [],
  // resolvers = {},
  // debounceWaitTime = 500,
  childs,
  currentPath,
}: RouterHelper) => {
  // console.log('hghhm', childs);

  function hasChildren(): boolean {
    // console.log(childs);
    return typeof childs !== 'undefined' && childs.length !== 0;
  }

  function isFinalRoute(): boolean {
    // if (hasChildren()) {
    //   return false;
    // }
    // console.log('hjmm');
    return path === currentPath; // TODO: need to replace to move smart compare
  }

  return { hasChildren, isFinalRoute };
};
