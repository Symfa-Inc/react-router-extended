import { Guard, sleep } from '../reactRouterAdvance';

export class MockGuard implements Guard {
  canActivateMoch: boolean;
  constructor(canActivateMoch = true) {
    this.canActivateMoch = canActivateMoch;
  }
  async canActivate(): Promise<boolean> {
    await sleep(200);

    return this.canActivateMoch;
  }
}
