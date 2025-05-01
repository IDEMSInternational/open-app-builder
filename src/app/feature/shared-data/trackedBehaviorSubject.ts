import { BehaviorSubject, Subject, Subscription, Observer } from "rxjs";

/**
 * Extended RXJS behaviour subject that keeps track of the number of active subscribers
 * and automatically completes when all previous subscribers have unsubscribed
 *
 * Adapted following various AI prompts
 */
export class TrackedBehaviorSubject<T> extends BehaviorSubject<T> {
  private subscriptions = 0;
  private subscriptionCount$ = new Subject<number>();

  constructor(value: T) {
    super(value);
    this.subscriptionCount$.subscribe((count) => {
      if (count === 0) {
        this.complete(); // Complete the BehaviorSubject
        this.subscriptionCount$.complete(); // Complete the subscriptionCount$ Subject
      }
    });
  }

  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    this.subscriptions++;
    this.subscriptionCount$.next(this.subscriptions);

    console.log("behaviour subject subscribe", this.subscriptions);

    let subscription: Subscription;
    if (observerOrNext && typeof observerOrNext === "object") {
      subscription = super.subscribe(observerOrNext);
    } else {
      subscription = super.subscribe(observerOrNext as (value: T) => void, error, complete);
    }

    const unsubscribe = () => {
      this.subscriptions--;
      this.subscriptionCount$.next(this.subscriptions);
      console.log("behaviour subject unsubscribed", this.subscriptions);
      subscription.unsubscribe();
    };

    return new Subscription(unsubscribe);
  }

  complete(): void {
    if (this.subscriptions === 0 && !this.isStopped) {
      super.complete();
    }
  }
}
