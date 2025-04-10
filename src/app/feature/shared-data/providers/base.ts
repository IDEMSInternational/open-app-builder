import { Injector } from "@angular/core";
import { of } from "rxjs";
import { ISharedDataCollection } from "../types";

export interface SharedDataQueryParams {
  /**
   * Shared data identifier. Can be single doc reference (e.g. "group_1")
   * or entire collection (e.g. "group_1/messages")
   **/
  id: string;
  /** Timestamp of most recent document to search for newer than */
  since: string | undefined;
}

export class SharedDataProviderBase {
  public async initialise(injector: Injector) {}

  /** Provide a live-query to a single document and stream updates */
  public querySingle$(params: SharedDataQueryParams) {
    console.error(`[Shared Data] Provider method not implemented: querySingle$`);
    return of({} as ISharedDataCollection);
  }
  /** Provide a live-query to all documents within    */
  public queryMultiple$(params: SharedDataQueryParams) {
    console.error(`[Shared Data] Provider method not implemented: queryMultiple$`);
    return of([] as ISharedDataCollection[]);
  }

  /** Create a new shared data collection with a given id */
  public async createSharedCollection(id: string, data: ISharedDataCollection) {
    console.error(`[Shared Data] Provider method not implemented: create`);
    return;
  }

  /**
   * Update a given key-value pair within a shared data collection
   * NOTE - setting as `undefined` will remove from the database
   */
  public async updateSharedData(id: string, key: string, value: any) {
    console.error(`[Shared Data] Provider method not implemented: updateData`);
    return;
  }

  /**
   * Remove
   */
  public async removeSharedCollection(id: string, data: any) {
    console.error(`[Shared Data] Provider method not implemented: remove`);
  }
}
