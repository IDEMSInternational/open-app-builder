import { Injector } from "@angular/core";
import { of } from "rxjs";
import { ISharedDataItem } from "../types";

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
  public querySingle$<T = ISharedDataItem>(params: SharedDataQueryParams) {
    console.error(`[Shared Data] Provider method not implemented: querySingle$`);
    return of({} as T);
  }
  /** Provide a live-query to all documents within    */
  public queryMultiple$<T = ISharedDataItem>(params: SharedDataQueryParams) {
    console.error(`[Shared Data] Provider method not implemented: queryMultiple$`);
    return of([] as T[]);
  }

  /** Create a new shared data collection with a given id */
  public async create(_id: string, data: ISharedDataItem) {
    console.error(`[Shared Data] Provider method not implemented: create`);
    return;
  }

  /**
   * Update a shared document with data provided
   * Data will be merged with existing data
   */
  public async set(_id: string, data: any) {
    console.error(`[Shared Data] Provider method not implemented: set`);
  }

  /**
   * Remove
   */
  public async remove(_id: string, data: any) {
    console.error(`[Shared Data] Provider method not implemented: remove`);
  }
}
