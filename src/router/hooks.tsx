import { useRef } from 'react';
import { ExtendedRouterStatus, Guard, PropsResolvers } from './types';

interface UserManager {
  resolvers: PropsResolvers;
  guards: Guard[];
  pathname: string;
  redirectUrl?: string;
}
interface InfoAboutComponent {
  [key: string]: UserManager & { props: any };
}

export function useManager({ resolvers, guards, pathname, redirectUrl }: UserManager) {
  const infoAboutComponent = useRef<InfoAboutComponent>({});
  if (!infoAboutComponent.current[pathname]) {
    infoAboutComponent.current[pathname] = {
      resolvers,
      guards,
      pathname,
      props: {},
      redirectUrl,
    };
  }

  async function checkGuards(pathname: string): Promise<ExtendedRouterStatus> {
    const result: { isOk: boolean; redirectUrl?: string }[] = [];
    for (const guard of infoAboutComponent.current[pathname].guards) {
      const hasFailInGuard = result.some(r => !r.isOk);
      if (hasFailInGuard) {
        continue;
      }
      try {
        const guardResult = await guard.canActivate();
        result.push({ isOk: guardResult, redirectUrl: guard.redirectUrl });
      } catch (e) {
        result.push({ isOk: false, redirectUrl: guard.redirectUrl });
        console.error('Error in guards');
        console.error(e);
      }
    }
    const firstFailedGuard = result.find(r => !r.isOk);
    if (firstFailedGuard && firstFailedGuard.redirectUrl) {
      infoAboutComponent.current[pathname] = {
        ...infoAboutComponent.current[pathname],
        redirectUrl: firstFailedGuard.redirectUrl,
      };
    }

    return !firstFailedGuard ? ExtendedRouterStatus.SUCCESS : ExtendedRouterStatus.FAIL;
  }

  async function loadResolvers() {
    const keys = Object.keys(resolvers).map(resolverKey => resolverKey);
    const promises = Object.keys(resolvers).map(resolverKey => resolvers[resolverKey].resolve());
    const resultOfResolvers = await Promise.all(promises).catch(e => {
      console.error('Error in resolvers');
      console.error(e);
    });
    return (resultOfResolvers as []).reduce((acc, next, index) => {
      const key = keys[index];
      return { ...acc, [key]: next };
    }, {});

    // infoAboutComponent.current = {
    //   ...infoAboutComponent.current,
    //   [pathname]: {
    //     ...infoAboutComponent.current[pathname],
    //     props,
    //   },
    // };
  }

  // function getProps(pathname: string) {
  //   return infoAboutComponent.current[pathname].props;
  // }

  function getRedirectUrl(): string {
    if (infoAboutComponent.current[pathname].redirectUrl) {
      return infoAboutComponent.current[pathname].redirectUrl as string;
    }
    return '/';
  }

  return { loadResolvers, checkGuards, getRedirectUrl };
}
