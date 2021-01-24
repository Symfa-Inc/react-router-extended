declare type Consumer = (val: any) => void;
export declare class SimpleSubject<T> {
    private subscription;
    private currentValue;
    constructor(initialValue?: T);
    subscribe(sub: Consumer): void;
    next(value: any): void;
    private notify;
}
export {};
