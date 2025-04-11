import { Injectable, Injector } from "@angular/core";

import { SharedDataProviderBase, SharedDataQueryParams } from "./providers/base";
import { getDataProvider } from "./providers";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import {
  map,
  tap,
  switchMap,
  defer,
  take,
  Observable,
  combineLatestWith,
  startWith,
  finalize,
  catchError,
  of,
} from "rxjs";
import {
  ISharedDataCollection,
  ISharedDataCollectionConfig,
  ISharedDataCollectionMetadata,
} from "./types";
import { MangoQuery } from "rxdb";
import { AuthService } from "src/app/shared/services/auth/auth.service";

import { TrackedBehaviorSubject } from "./trackedBehaviorSubject";
import { generateUUID } from "src/app/shared/utils";
import { Device } from "@capacitor/device";

@Injectable({
  providedIn: "root",
})
export class SharedDataService extends AsyncServiceBase {
  public provider: SharedDataProviderBase;

  // Cache of active query subjects by resource path
  private queryCache = new Map<string, TrackedBehaviorSubject<ISharedDataCollection[]>>();

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
   *
   * Additional optimization allows for multiple query requests for the same resource path to be
   * grouped together so that only a single active data connection is maintained
   */
  public query$(resourcePath?: string) {
    // In case multiple components attempting to query same data use cache to allow
    // multiple observers to subscribe to the same data
    const existingQuery = this.queryCache.get(resourcePath);
    if (existingQuery) {
      return existingQuery;
    }

    // Create a new subject for this resource path and store in cache
    const subject = new TrackedBehaviorSubject<ISharedDataCollection[]>([]);
    this.queryCache.set(resourcePath, subject);

    // Create data query for cache and server data.
    // Subscribe to query and use to update subject
    const query = this.createCombinedServerCacheQuery(resourcePath);
    const subscription = query.subscribe({
      next: (data) => subject.next(data),
      error: (err) => subject.error(err),
      // complete not required as firestore query stays open indefinitely
    });

    // The TrackedBehaviourSubject will automatically complete whenever there are no active
    // subscribers. When this happens also unsubscribe from inner data subscription and remove cache
    return subject.pipe(
      finalize(() => {
        subscription.unsubscribe();
        this.queryCache.delete(resourcePath);
      })
    );
  }

  public async createSharedCollection(config: ISharedDataCollectionConfig = {}) {
    const _created_by = this.authService.provider.authUser()?.uid;
    const id = generateUUID();
    const meta: ISharedDataCollectionMetadata = {
      _created_by,
      _created_at: new Date().toISOString(),
      _updated_at: new Date().toISOString(),
      id,
    };
    return this.provider.createSharedCollection(id, {
      ...config,
      ...meta,
      profile: {},
      admins: [_created_by],
      members: [_created_by],
    });
  }

  public update(id: string, key: string, value: any) {
    return this.provider.updateSharedData(id, key, value);
  }

  public async clearCache() {
    // stop all active data subscriptions
    [...this.queryCache.values()].forEach((subject) => {
      subject.next([]);
      subject.complete();
    });

    const state = await this.dynamicDataService.getState();
    const sharedDataState = state.data_list?.["_shared_data"] || {};

    await this.dynamicDataService.resetFlow("data_list", `_shared_data`);
    for (const flowName of Object.keys(sharedDataState)) {
      await this.dynamicDataService.resetFlow("data_list", `_shared_data/${flowName}`);
    }
    // perform a reload to re-init any active subscriptions
    location.reload();
  }

  /**
   * Create a combined query that first checks cache for latest entry, and then
   * switches to server query for updates, saving updates to cache and emitting
   */
  private createCombinedServerCacheQuery(resourcePath: string) {
    // Use defer statement to allow awaiting async service init as part of observable
    return defer(async () => {
      await this.ready();
    }).pipe(
      switchMap(() => {
        // Combine cache and server queries so that they can be unsubscribed at the same time.
        // Only emit results from cache as server updates will update the cache. Force server to emit
        // empty update immediately as combine only emits after receiving first value from each
        const cacheQuery = this.getCacheQuery(resourcePath);
        const serverQuery = this.getServerQuery(resourcePath, cacheQuery).pipe(startWith([]));

        return cacheQuery.pipe(
          combineLatestWith(serverQuery),
          map(([cacheDocs, serverDocs]) => cacheDocs)
        );
      })
    );
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

        const auth_id = this.authService.provider.authUser()?.uid;
        const queryParams: SharedDataQueryParams = { id, since: lastUpdate, auth_id };

        // 3. create a server query either for a specific doc or for all docs in a collection
        // in both cases return results as an array for better uniformity
        const serverQuery =
          segments.length % 2 === 0
            ? this.provider.queryMultiple$(queryParams).pipe(map((docs) => docs || []))
            : this.provider.querySingle$(queryParams).pipe(map((doc) => (doc ? [doc] : [])));

        // 4. When new data received update the cache as a side-effect
        return serverQuery.pipe(
          tap((serverDocs) => this.updateCache(id, serverDocs)),
          catchError((err) => {
            console.error("server query err", err);
            return of([]);
          })
        );
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
