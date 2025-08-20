import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import {
  FirebaseFirestore,
  AddCollectionSnapshotListenerOptions,
  CallbackId,
  QueryFieldFilterConstraint,
} from "@capacitor-firebase/firestore";
import { SharedDataProviderBase, SharedDataQueryParams } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { ISharedDataCollection } from "../types";

/** Prefix applied to all firebase collections for storing shared data */
const COLLECTION = `shared_data`;

// Utility to provide type-safety on where clause queries
function whereTyped(
  fieldPath: keyof ISharedDataCollection,
  opStr: QueryFieldFilterConstraint["opStr"],
  value: unknown
): QueryFieldFilterConstraint {
  return {
    fieldPath,
    opStr,
    value,
    type: "where",
  };
}

/**
 * Unified provider to support firestore data on both web and native
 *
 * IMPORTANT
 * @capacitor-firebase uses different sdks per platform (web/native).
 * As such only features available to all platforms should be used
 *
 * Known Limitations
 * Capacitor SDK does not (currently) support fieldValues like timestamp and serverTimestamp
 * https://github.com/capawesome-team/capacitor-firebase/pull/677
 *
 */
export class FirebaseDataProvider implements SharedDataProviderBase {
  public async initialise(injector: Injector): Promise<void> {
    const firebaseService = injector.get(FirebaseService);
    firebaseService.ready();
  }

  public querySingle$(params: SharedDataQueryParams): Observable<ISharedDataCollection> {
    const { id } = params;
    const docPath = `${COLLECTION}/${id}`;
    return this.documentToObservable(docPath);
  }

  public queryMultiple$(params: SharedDataQueryParams): Observable<ISharedDataCollection[]> {
    const collectionPath = COLLECTION;

    const listenerOptions: AddCollectionSnapshotListenerOptions = {
      reference: collectionPath,
      compositeFilter: {
        type: "and", // All 'where' clauses must be met
        queryConstraints: this.buildFilterConstraints(params),
      },
      // queryConstraints would go here if we had orderBy or limit clauses
    };
    return this.collectionToObservable(listenerOptions);
  }

  public async createSharedCollection(id: string, data: ISharedDataCollection) {
    const docPath = `${COLLECTION}/${id}`;

    await FirebaseFirestore.setDocument({
      reference: docPath,
      data,
    });
    return data;
  }

  public updateSharedData(id: string, key: string, value: any) {
    const docRef = `${COLLECTION}/${id}`;
    const valueToSet = value === undefined ? "deleteField" : value;

    // remove nested data entry
    // HACK - not supported on native so set entire document without
    if (value === undefined) {
      return this.hackHandleNativeDeleteField(docRef, key);
    }

    return FirebaseFirestore.updateDocument({
      reference: docRef,
      data: {
        [`data.${key}`]: valueToSet,
        _updated_at: new Date().toISOString(),
      },
    });
  }

  public deleteSharedCollection(id: string) {
    const docPath = `${COLLECTION}/${id}`;
    return FirebaseFirestore.deleteDocument({ reference: docPath });
  }

  public async updateCollectionMetadata(
    id: string,
    update: Partial<ISharedDataCollection>
  ): Promise<void> {
    const docPath = `${COLLECTION}/${id}`;
    return FirebaseFirestore.updateDocument({
      reference: docPath,
      data: {
        ...update,
        _updated_at: new Date().toISOString(),
      },
    });
  }

  /**
   * Native sdk does not (currently) support `deleteField()` so manually retrieve doc
   * delete field and update
   */
  private async hackHandleNativeDeleteField(docRef: string, field: string) {
    const { snapshot } = await FirebaseFirestore.getDocument({ reference: docRef });
    if (snapshot.data && field in snapshot.data) {
      delete snapshot.data[field];
      return FirebaseFirestore.setDocument({
        reference: docRef,
        data: { ...snapshot.data, _updated_at: new Date().toISOString() },
        merge: false,
      });
    }
  }

  private buildFilterConstraints(params: SharedDataQueryParams): QueryFieldFilterConstraint[] {
    const { since, auth_id } = params;
    const constraints: QueryFieldFilterConstraint[] = [];

    if (since) {
      // convert isoString date to firestore timestamp for comparison
      const queryDate = since;
      constraints.push(whereTyped("_updated_at", ">", queryDate));
    }

    constraints.push(whereTyped("members", "array-contains", auth_id));
    return constraints;
  }

  private collectionToObservable(
    options: AddCollectionSnapshotListenerOptions
  ): Observable<ISharedDataCollection[]> {
    // Timeout for server data to be received before falling back to cache
    const TIMEOUT = 2000;

    return new Observable<ISharedDataCollection[]>((observer) => {
      let callbackId: CallbackId;
      let hasEmittedServerData = false;
      let cachedData: ISharedDataCollection[] | null = null;
      let cacheTimeout: any;

      const registerListener = async () => {
        try {
          callbackId = await FirebaseFirestore.addCollectionSnapshotListener(
            options, // Pass the whole options object
            (event, error) => {
              if (error) {
                observer.error(error);
                return;
              }
              if (event) {
                const isFromCache = event.snapshots.some((doc) => doc.metadata?.fromCache);
                const items = event.snapshots.map((doc) => doc.data as ISharedDataCollection);

                if (isFromCache) {
                  // Store cached data but don't emit immediately
                  cachedData = items;

                  // Set a timeout to emit cached data if server data doesn't arrive
                  if (!hasEmittedServerData && !cacheTimeout) {
                    cacheTimeout = setTimeout(() => {
                      if (!hasEmittedServerData && cachedData) {
                        console.log(
                          "[FIREBASE DATA PROVIDER] - COLLECTION TO OBSERVABLE - Items from cache (fallback)",
                          cachedData
                        );
                        observer.next(cachedData);
                      }
                    }, TIMEOUT); // Wait 2 seconds for server data before falling back to cache
                  }
                } else {
                  // Server data received - emit immediately and clear cache timeout
                  hasEmittedServerData = true;
                  if (cacheTimeout) {
                    clearTimeout(cacheTimeout);
                    cacheTimeout = null;
                  }
                  console.log(
                    "[FIREBASE DATA PROVIDER] - COLLECTION TO OBSERVABLE - Items from server",
                    items
                  );
                  observer.next(items);
                }
              }
            }
          );
        } catch (e) {
          observer.error(e);
        }
      };

      registerListener();

      return () => {
        if (callbackId) {
          FirebaseFirestore.removeSnapshotListener({ callbackId });
        }
        if (cacheTimeout) {
          clearTimeout(cacheTimeout);
        }
      };
    });
  }

  private documentToObservable(path: string): Observable<ISharedDataCollection> {
    // Timeout for server data to be received before falling back to cache
    const TIMEOUT = 2000;

    return new Observable<ISharedDataCollection>((observer) => {
      let callbackId: CallbackId;
      let hasEmittedServerData = false;
      let cachedData: ISharedDataCollection | null = null;
      let cacheTimeout: any;

      const registerListener = async () => {
        try {
          callbackId = await FirebaseFirestore.addDocumentSnapshotListener(
            { reference: path },
            (event, error) => {
              if (error) {
                observer.error(error);
                return;
              }
              if (event && event.snapshot.data) {
                const isFromCache = event.snapshot.metadata?.fromCache;
                const item = event.snapshot.data as ISharedDataCollection;

                if (isFromCache) {
                  // Store cached data but don't emit immediately
                  cachedData = item;

                  // Set a timeout to emit cached data if server data doesn't arrive
                  if (!hasEmittedServerData && !cacheTimeout) {
                    cacheTimeout = setTimeout(() => {
                      if (!hasEmittedServerData && cachedData) {
                        console.log(
                          "[FIREBASE DATA PROVIDER] - DOCUMENT TO OBSERVABLE - Item from cache (fallback)",
                          cachedData
                        );
                        observer.next(cachedData);
                      }
                    }, TIMEOUT); // Wait 2 seconds for server data before falling back to cache
                  }
                } else {
                  // Server data received - emit immediately and clear cache timeout
                  hasEmittedServerData = true;
                  if (cacheTimeout) {
                    clearTimeout(cacheTimeout);
                    cacheTimeout = null;
                  }
                  console.log(
                    "[FIREBASE DATA PROVIDER] - DOCUMENT TO OBSERVABLE - Item from server",
                    item
                  );
                  observer.next(item);
                }
              } else {
                observer.next(undefined);
              }
            }
          );
        } catch (e) {
          observer.error(e);
        }
      };

      registerListener();

      return () => {
        if (callbackId) {
          FirebaseFirestore.removeSnapshotListener({ callbackId });
        }
        if (cacheTimeout) {
          clearTimeout(cacheTimeout);
        }
      };
    });
  }
}
