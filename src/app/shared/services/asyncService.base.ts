import { filter, first, tap, timeout } from "rxjs/operators";
import { BehaviorSubject, of, firstValueFrom } from "rxjs";
import type { SyncServiceBase } from "./syncService.base";

/**
 * Base class for service with async init method
 * Provides `await service.ready()` call to check when init complete
 *
 * Can be useful in cases where one service depends on another to be initialised
 * before performing operations. E.g.
 * ```
 * class MyService extends AsyncServiceBase
 * constructor(private anotherService:AsyncService){
 *   this.registerInitFunction(this.initialise)
 * }
 *
 * ...
 * private initialise(){
 *  await myAsyncService.ready()
 *  doSomethingWithService()
 * }
 * ```
 */
export class AsyncServiceBase {
  /** Private variable for tracking if initialised */
  private initialised$ = new BehaviorSubject(false);

  /** Private track whether init called */
  private initCalled = false;

  /** Extended class function called to initialise class */
  private initFunction: () => Promise<void>;

  /**
   * @param serviceName Name of child service for use in logging
   */
  protected constructor(private serviceName: string) {}

  /**
   * When calling the inherited init function from the base class the context will be set incorrectly,
   * meaning that other calls to class injected services will fail. As a workaround manually register
   * child init classes here.
   *
   * On the plus side it means extended class init methods can be marked as private and do not have
   * to be called init
   *
   * @param callImmediately Call init function immediately (default false, defer until first `ready()` called)
   */
  public registerInitFunction(fn: () => Promise<void>, callImmediately = false) {
    this.initFunction = fn;
    if (callImmediately) {
      this.callInitFunction();
    }
    // HACK - until code a bit tidier ensure all services still register after random timeout (5-10s)
    else {
      setTimeout(() => {
        this.callInitFunction();
      }, 5000 + Math.random() * 5000);
    }
  }

  /**
   * public function to check if service async init method has been completed and wait if not
   * @param timeout ms to wait before silently failing (default 60s)
   * @returns Promise<boolean>
   */
  public async ready(timeoutValue = 60 * 1000): Promise<boolean> {
    if (!this.initCalled) {
      this.callInitFunction();
    }
    // Convert subject to promise by subscribing only to the first value emitted
    // and filtering to only emit value when initialised true
    return firstValueFrom(
      this.initialised$.pipe(
        filter((v) => v === true),
        first(),
        timeout({
          each: timeoutValue,
          with: () =>
            of(true).pipe(
              tap(() => {
                console.log(`%c ${this.serviceName || ""} `, "background: #bd8173; color: black");
              })
            ),
        })
      )
    );
  }
  /** Synchronous method to check current ready state */
  isReady = () => this.initialised$.value === true;

  /**
   * Utility method to wait for `ready` promise from multiple services
   */
  public ensureAsyncServicesReady(services: AsyncServiceBase[]) {
    return Promise.all(
      services.map(async (service) => {
        await service.ready();
      })
    );
  }
  /** Syntactic sugar just to keep track of sync services which will self-init */
  public ensureSyncServicesReady(services: SyncServiceBase[]) {
    return services.map((service) => service.ready());
  }

  /** Call the provided init method */
  private async callInitFunction() {
    if (!this.initFunction) {
      throw new Error("Must call registerInitFunction in extended class");
    }
    if (this.initCalled) {
      return;
    }
    this.initCalled = true;
    const startTime = performance.now();
    console.log(`%c ${this.serviceName || ""} `, "background: #deaa50; color: black");
    await this.initFunction();
    this.initialised$.next(true);
    const endTime = performance.now();
    const totalTime = Math.round(endTime - startTime);
    console.log(`%c ${this.serviceName} (${totalTime}ms) `, "background: #7ebd73; color: black");
  }

  /**
   * Required child method to provide any async initialisation logic
   * NOTE - not working as angular doesn't provided injected services when called this way
   * */
  // abstract init(): Promise<void>;
}
