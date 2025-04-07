import { Injector, signal } from "@angular/core";

export class SharedDataProviderBase {
  public async initialise(injector: Injector) {}

  /**
   * Update a shared document with data provided
   * Data will be merged with existing data
   */
  public async set(_list_id: string, _id: string, data: any) {}

  /**
   * Remove
   */
  public async remove(_list_id: string, _id: string, data: any) {}
}
