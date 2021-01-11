import { Guard, sleep } from '../reactRouterAdvance';

export class MockGuard implements Guard {
  constructor(public canActivateMoch = true, public redirectUrl?: string) {}
  async canActivate(): Promise<boolean> {
    await sleep(5000);

    return this.canActivateMoch;
  }
}
