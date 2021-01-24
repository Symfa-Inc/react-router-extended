import { Guard, sleep } from '../../reactRouterAdvance';

export class MockConsistentlyWorkGuard implements Guard {
  constructor(private delay: number, private message: string, private allowEnter = true) {}

  async canActivate(): Promise<boolean> {
    await sleep(this.delay);

    const element = document.getElementById('insert-place');
    if (element) {
      element.innerHTML += this.message;
    }
    return this.allowEnter;
  }
}
