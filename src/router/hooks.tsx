import { useRef } from 'react';
import { PropsResolvers, Guard, ExtentedRouterStatus } from './types';

interface UserManager {
  resolvers: PropsResolvers;
  guards: Guard[];
  pathname: string;
}
interface InfoAboutComponent {
  [key: string]: UserManager & { props: any };
}

export function useManager({ resolvers, guards, pathname }: UserManager) {
  const infoAboutComponent = useRef<InfoAboutComponent>({});
  if (!infoAboutComponent.current[pathname]) {
    infoAboutComponent.current[pathname] = {
      resolvers,
      guards,
      pathname,
      props: {},
    };
  }

  async function checkGuards(pathname: string): Promise<ExtentedRouterStatus> {
    const result = [];
    for (const guard of infoAboutComponent.current[pathname].guards) {
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

  async function loadResolvers(pathname: string) {
    const keys = Object.keys(infoAboutComponent.current[pathname].resolvers).map(resolverKey => resolverKey);
    const promises = Object.keys(infoAboutComponent.current[pathname].resolvers).map(resolverKey =>
      infoAboutComponent.current[pathname].resolvers[resolverKey].resolve(),
    );
    const resultOfResolvers = await Promise.all(promises).catch(e => {
      console.error('Error in resolvers');
      console.error(e);
    });
    const props = (resultOfResolvers as []).reduce((acc, next, index) => {
      const key = keys[index];
      return { ...acc, [key]: next };
    }, {});

    infoAboutComponent.current = {
      ...infoAboutComponent.current,
      [pathname]: {
        ...infoAboutComponent.current[pathname],
        props,
      },
    };
  }

  function getProps(pathname: string) {
    return infoAboutComponent.current[pathname].props;
  }

  return { loadResolvers, getProps, checkGuards };
}
