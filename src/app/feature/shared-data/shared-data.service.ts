import { Injectable, Injector } from "@angular/core";

import { SharedDataProviderBase, SharedDataQueryParams } from "./providers/base";
import { getDataProvider } from "./providers";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { map, tap, switchMap, defer, take, Observable, combineLatestWith, startWith } from "rxjs";
import {
  ISharedDataCollection,
  ISharedDataCollectionConfig,
  ISharedDataCollectionMetadata,
} from "./types";
import { MangoQuery } from "rxdb";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class SharedDataService extends AsyncServiceBase {
  public provider: SharedDataProviderBase;

  constructor(
    private deploymentService: DeploymentService,
    private injector: Injector,
    private dynamicDataService: DynamicDataService,
    private authService: AuthService
  ) {
    super("Shared Data");
    this.provider = getDataProvider(this.config.provider);
    this.registerInitFunction(this.initialise);
  }

  /**
   * Create a query to subscribe to live data source, update cache and
   * @param id specific document id or path to query. If not provided all shared data docs will be returned
   *
   * The query will return all results from the cache, but also include a side-effect that
   * checks server for updates and automatically updates the cache so that a single stream of data emitted,
   * starting with cached and applying updates from server
   */
  public query$(id?: string) {
    // Use defer statement to allow async await for services to be initialised
    return defer(async () => {
      await this.ready();
    }).pipe(
      switchMap(() => {
        // Combine cache and server queries so that they can be unsubscribed at the same time.
        // Only emit results from cache as server updates will update the cache. Force server to emit
        // empty update immediately as combine only emits after receiving first value from each
        const cacheQuery = this.getCacheQuery(id);
        const serverQuery = this.getServerQuery(id, cacheQuery).pipe(startWith([]));

        return cacheQuery.pipe(
          combineLatestWith(serverQuery),
          map(([cacheDocs, serverDocs]) => cacheDocs)
        );
      })
    );
  }

  public create(id: string, config: ISharedDataCollectionConfig = {}) {
    const _created_by = this.authService.provider.authUser()?.uid;
    const mergedConfig: ISharedDataCollectionConfig = { isPublic: true, ...config };
    const meta: ISharedDataCollectionMetadata = {
      _created_by,
      _created_at: new Date().toISOString(),
      _updated_at: new Date().toISOString(),
      id,
    };
    return this.provider.create(id, { ...mergedConfig, ...meta, data: {} });
  }

  public update(id: string, data: ISharedDataCollection["data"]) {
    // TODO - ensure provider populates server timestamps for _created_at and _updated_at
  }

  private async updateCache(id: string, docs: ISharedDataCollection[]) {
    if (docs.length > 0) {
      const cacheName = id ? `_shared_data/${id}` : "_shared_data";
      await this.dynamicDataService.bulkUpsert("data_list", cacheName, docs);
    }
  }

  /** Retrieve docs stored in cache, sorted by most recently updated */
  private getCacheQuery(id?: string) {
    const cacheName = id ? `_shared_data/${id}` : "_shared_data";

    // if id provided filter query to only return doc matching id, default return all in collection
    const query: MangoQuery = id ? { selector: { id } } : {};
    return this.dynamicDataService
      .query$<ISharedDataCollection>("data_list", cacheName, query)
      .pipe(map((docs) => docs.sort((a, b) => (a._updated_at > b._updated_at ? 1 : -1))));
  }

  /** Prepare query to request latest docs from server */
  private getServerQuery(id = "", cacheQuery: Observable<ISharedDataCollection[]>) {
    // 0. Extract path segments to determine if single (e.g. group_1) or multiple (e.g. group_1/messages) query
    const segments = id?.split("/").filter((v) => v) || [];

    // 1. Use the first result from the cacheQuery to find timestamp of latest doc in cache
    return cacheQuery.pipe(
      take(1),
      switchMap((cacheDocs) => {
        // 2. With the initial cache docs retrieved create server query for newer
        const lastUpdate = cacheDocs[0]?._updated_at;
        const queryParams: SharedDataQueryParams = { id, since: lastUpdate };

        // 3. create a server query either for a specific doc or for all docs in a collection
        // in both cases return results as an array for better uniformity
        const serverQuery =
          segments.length % 2 === 0
            ? this.provider.queryMultiple$(queryParams).pipe(map((docs) => docs || []))
            : this.provider.querySingle$(queryParams).pipe(map((doc) => (doc ? [doc] : [])));

        // 4. When new data received update the cache as a side-effect
        return serverQuery.pipe(tap((serverDocs) => this.updateCache(id, serverDocs)));
      })
    );
  }

  private get config() {
    return this.deploymentService.config.shared_data;
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    await this.dynamicDataService.ready();
  }
}
