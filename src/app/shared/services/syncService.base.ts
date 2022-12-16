import type { AsyncServiceBase } from "./asyncService.base";

/**
 * Similar to async service base, with the exception that init always called immediately
 * and should resolve synchronously
 * ```
 * class MyService extends SyncServiceBase{
 *  constructor(...syncDeps){
 *     // should handle synchronous init immediately
 *  }
 * }
 * ```
 */
export class SyncServiceBase {
  /**
   * @param serviceName Name of child service for use in logging
   */
  protected constructor(private serviceName: string) {}

  public ready(): boolean {
    return true;
  }
  /** Synchronous method to check current ready state */
  isReady = () => true;

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
}
