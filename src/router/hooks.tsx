import { useRef } from 'react';
import { PropsResolvers, Guard, ExtentedRouterStatus } from './types';

interface UserManager {
  resolvers: PropsResolvers;
  guards: Guard[];
}

export function useManager({ resolvers, guards }: UserManager) {
  const componentProps = useRef({});
  const allResolvers = useRef(resolvers);
  const allGuards = useRef(guards);

  async function checkGuards(): Promise<ExtentedRouterStatus> {
    const result = [];
    for (const guard of allGuards.current) {
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
  }

  async function loadResolvers() {
    const keys = Object.keys(allResolvers.current).map(resolverKey => resolverKey);
    const promises = Object.keys(resolvers).map(resolverKey => resolvers[resolverKey].resolve());
    const resultOfResolvers = await Promise.all(promises).catch(e => {
      console.error('Error in resolvers');
      console.error(e);
    });
    componentProps.current = (resultOfResolvers as []).reduce((acc, next, index) => {
      const key = keys[index];
      return { ...acc, [key]: next };
    }, {});
  }

  function getProps() {
    return componentProps.current;
  }

  return { loadResolvers, getProps, checkGuards };
}
