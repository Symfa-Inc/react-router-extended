import { useRef } from 'react';
import { PropsResolvers, Guard, ExtentedRouterStatus } from './types';

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
      redirectUrl
    };
  }

  async function checkGuards(pathname: string): Promise<ExtentedRouterStatus> {
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

    return !firstFailedGuard ? ExtentedRouterStatus.SUCCESS : ExtentedRouterStatus.FAIL;
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

  function getRedirectUrl(): string {
    if (infoAboutComponent.current[pathname].redirectUrl) {
      return infoAboutComponent.current[pathname].redirectUrl as string;
    }
    return '/';
  }

  return { loadResolvers, getProps, checkGuards, getRedirectUrl };
}
