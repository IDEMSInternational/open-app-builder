import { Injectable, Injector } from "@angular/core";

import { SharedDataProviderBase, SharedDataQueryParams } from "./providers/base";
import { getDataProvider } from "./providers";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { map, tap, switchMap, defer, firstValueFrom } from "rxjs";
import { ISharedDataItem } from "./types";
import { mergeObjectArrays } from "packages/shared/src/utils/object-utils";
import { MangoQuery } from "rxdb";

@Injectable({
  providedIn: "root",
})
export class SharedDataService extends AsyncServiceBase {
  public provider: SharedDataProviderBase;

  constructor(
    private deploymentService: DeploymentService,
    private injector: Injector,
    private dynamicDataService: DynamicDataService
  ) {
    super("Shared Data");
    this.provider = getDataProvider(this.config.provider);
    this.registerInitFunction(this.initialise);
  }

  /**
   * Create a query to subscribe to live data source, update cache and
   * @param id specific document id or path to query. If not provided all shared data docs will be returned
   */
  public query$(id?: string) {
    // 0. Extract path segments to determine if single (e.g. group_1) or multiple (e.g. group_1/messages) query
    const segments = id?.split("/").filter((v) => v) || [];

    // TODO - always emit from cache

    // 1. Query cache for any docs saved. run once and store results
    return defer(async () => {
      await this.ready();
      return this.getCacheDocs(id);
    }).pipe(
      switchMap((cacheDocs) => {
        const queryParams: SharedDataQueryParams = { id, since: cacheDocs[0]?._updated_at };
        // create a server query either for a specific doc or for all docs in a collection
        // in both cases return results as an array for better uniformity
        const serverQuery =
          segments.length % 2 === 0
            ? this.provider.queryMultiple$(queryParams).pipe(map((docs) => docs || []))
            : this.provider.querySingle$(queryParams).pipe(map((doc) => (doc ? [doc] : [])));

        // 2. Take the latest timestamp query server for newer
        return (
          serverQuery
            // 3. Update cache on server updates
            .pipe(
              // Server docs initially return `null` response to inform data is fetching
              tap((serverDocs) => this.updateCache(id, serverDocs)),
              // 4. Return combined cache and server docs
              // Use non-deep merge to ensure any server docs fully overwrite cache docs
              map((serverDocs) =>
                mergeObjectArrays(cacheDocs, serverDocs, { keyField: "id", deep: false })
              )
            )
        );
      })
    );
  }

  public update(id: string, data: ISharedDataItem["data"]) {
    // TODO - ensure provider populates server timestamps for _created_at and _updated_at
  }

  private async updateCache(id: string, docs: ISharedDataItem[]) {
    const cacheName = id ? `_shared_data/${id}` : "_shared_data";
    console.log("update cache", cacheName, docs);
    await this.dynamicDataService.bulkUpsert("data_list", cacheName, docs);
  }

  /** Retrieve docs stored in cache, sorted by most recently updated */
  private async getCacheDocs(id?: string) {
    const cacheName = id ? `_shared_data/${id}` : id;
    // TODO - different methods for single doc vs collection?

    // if id provided filter query to only return doc matching id, default return all in collection
    const query: MangoQuery = id ? { selector: { id } } : {};
    const q = this.dynamicDataService.query$<ISharedDataItem>("data_list", cacheName, query);
    const docs = await firstValueFrom(q);
    return docs.sort((a, b) => (a._updated_at > b._updated_at ? 1 : -1));
  }

  private get config() {
    return this.deploymentService.config.shared_data;
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    await this.dynamicDataService.ready();
  }
}
