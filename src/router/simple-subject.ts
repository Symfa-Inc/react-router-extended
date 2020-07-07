type Consumer = (val: any) => void;

export class SimpleSubject<T> {
  private subscription: Consumer[] = [];

  private currentValue: any;
  constructor(initialValue?: T) {
    this.currentValue = initialValue;
  }

  subscribe(sub: Consumer) {
    this.subscription.push(sub);
  }

  next(value: any) {
    this.currentValue = value;
    this.notify();
  }

  private notify(sub?: Consumer) {
    if (sub) {
      sub(this.currentValue);
      return;
    }
    this.subscription.forEach(sub => {
      sub(this.currentValue);
    });
  }
}
