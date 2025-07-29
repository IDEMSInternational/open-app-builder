import { Injector } from "@angular/core";
import { of } from "rxjs";
import { ISharedDataCollection } from "../types";

export interface SharedDataQueryParams {
  /**
   * Shared data identifier. Can be single doc reference (e.g. "group_1")
   * or entire collection (e.g. "group_1/messages")
   **/
  id: string;
  /** id of authenticated user */
  auth_id: string;
  /** Timestamp of most recent document to search for newer than */
  since: string | undefined;
}

export class SharedDataProviderBase {
  public async initialise(injector: Injector) {}

  /** Provide a live-query to a single document and stream updates */
  public querySingle$(params: SharedDataQueryParams, options: { serverOnly?: boolean } = {}) {
    console.error(`[Shared Data] Provider method not implemented: querySingle$`);
    return of({} as ISharedDataCollection);
  }
  /** Provide a live-query to all documents within    */
  public queryMultiple$(params: SharedDataQueryParams, options: { serverOnly?: boolean } = {}) {
    console.error(`[Shared Data] Provider method not implemented: queryMultiple$`);
    return of([] as ISharedDataCollection[]);
  }

  /** Create a new shared data collection with a given id */
  public async createSharedCollection(id: string, data: ISharedDataCollection) {
    console.error(`[Shared Data] Provider method not implemented: createSharedCollection`);
    return data;
  }

  public async updateCollectionMetadata(id: string, update: Partial<ISharedDataCollection>) {
    console.error(`[Shared Data] Provider method not implemented: updateCollectionMetadata`);
    return null;
  }

  /**
   * Update a given key-value pair within a shared data collection
   * NOTE - setting as `undefined` will remove from the database
   */
  public async updateSharedData(id: string, key: string, value: any) {
    console.error(`[Shared Data] Provider method not implemented: updateSharedData`);
    return null;
  }

  /**
   * Delete
   */
  public async deleteSharedCollection(id: string) {
    console.error(`[Shared Data] Provider method not implemented: deleteSharedCollection`);
  }
}
