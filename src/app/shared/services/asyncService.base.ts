import { filter, first } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

/**
 * Base class for service with async init method
 * Provides `await service.ready()` call to check when init complete
 *
 * Can be useful in cases where one service depends on another to be initialised
 * before performing operations. E.g.
 * ```
 * class MyService extends AsyncServiceBase
 * constructor(private anotherService:AsyncService){
 *   this.registerInitFunction(this.init)
 * }
 *
 * ...
 * function(){
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
   * @param eager Call init function immediately on import (default false, defer until first `ready()` called)
   */
  protected constructor(private serviceName: string, private eager = false) {}

  /**
   * When calling the inherited init function from the base class the context will be set incorrectly,
   * meaning that other calls to class injected services will fail. As a workaround manually register
   * child init classes here.
   *
   * On the plus side it means extended class init methods can be marked as private and do not have
   * to be called init
   */
  public registerInitFunction(fn: () => Promise<void>) {
    this.initFunction = fn;
    if (this.eager) {
      this.callInitFunction();
    }
  }

  /**
   * public function to check if service async init method has been completed
   * @returns Promise<boolean>
   */
  public async ready(): Promise<boolean> {
    if (!this.initCalled) {
      this.callInitFunction();
    }
    // Convert subject to promise by subscribing only to the first value emitted
    // and filtering to only emit value when initialised true
    return this.initialised$
      .pipe(
        filter((v) => v === true),
        first()
      )
      .toPromise();

    // RXJS7 Version (future upgrade)
    // return firstValueFrom(this.initialised$.pipe(filter((v: boolean) => v === true)));
  }

  /**
   * Utility method to wait for `ready` promise from multiple services
   */
  public ensureServicesReady(services: AsyncServiceBase[]) {
    return Promise.all(
      services.map(async (service) => {
        await service.ready();
      })
    );
  }

  /** Call the provided init method */
  private async callInitFunction() {
    if (!this.initFunction) {
      throw new Error("Must call registerInitFunction in extended class");
    }
    console.log(`%c ${this.serviceName || ""} `, "background: #deaa50; color: black");
    this.initCalled = true;
    await this.initFunction();
    this.initialised$.next(true);
    console.log(`%c ${this.serviceName || ""} `, "background: #7ebd73; color: black");
  }

  /**
   * Required child method to provide any async initialisation logic
   * NOTE - not working as angular doesn't provided injected services when called this way
   * */
  // abstract init(): Promise<void>;
}
