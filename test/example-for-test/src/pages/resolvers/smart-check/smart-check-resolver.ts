import { Resolver, sleep } from '../../../reactRouterAdvance';

export class SmartCheckResolver implements Resolver {
  constructor(private delay: number) {}

  async resolve(): Promise<any> {
    await sleep(this.delay);
    return Date.now();
  }
}
