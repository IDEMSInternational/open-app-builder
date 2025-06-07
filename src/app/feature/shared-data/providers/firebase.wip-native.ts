import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import {
  deleteField as deleteFieldWeb,
  serverTimestamp as serverTimestampWeb,
  Timestamp as TimestampWeb,
  WhereFilterOp,
} from "firebase/firestore";
import {
  FirebaseFirestore,
  AddCollectionSnapshotListenerOptions,
  CallbackId,
  DocumentData,
  QueryFieldFilterConstraint,
} from "@capacitor-firebase/firestore";
import { SharedDataProviderBase, SharedDataQueryParams } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { ISharedDataCollection } from "../types";
import { Capacitor } from "@capacitor/core";

/** Prefix applied to all firebase collections for storing shared data */
const COLLECTION = `shared_data`;

// Data stored in firestore replaces ISOString timestamps with Firestore Timestamps
type ISharedDataCollectionFirestore = Omit<ISharedDataCollection, "_created_at" | "_updated_at"> & {
  _created_at: TimestampWeb;
  _updated_at: TimestampWeb;
};

// Utility to provide type-safety on where clause queries
function whereTyped(
  fieldPath: keyof ISharedDataCollection,
  opStr: WhereFilterOp,
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
 * Capacitor native firestore does not support `serverTimestamp` method, and cannot pass generated
 * Timestamp objects over native bridge, so provide workarounds as required
 * https://github.com/capawesome-team/capacitor-firebase/pull/677
 */
export const HACK_FIELD_VALUES = {
  serverTimestamp: () => (Capacitor.isNativePlatform() ? new Date() : serverTimestampWeb()),
  timestamp: (d: Date) => (Capacitor.isNativePlatform() ? d : TimestampWeb.fromDate(d)),
};

/** Convert timestamps stored locally (isoString) and on firestore (Timestamp) */
const sharedDataConverter = {
  fromFirestore: (d: DocumentData) => {
    return {
      ...(d as ISharedDataCollectionFirestore),
      _created_at: d._created_at.toDate().toISOString(),
      _updated_at: d._updated_at?.toDate().toISOString(),
    } as ISharedDataCollection;
  },

  toFirestore: (d: ISharedDataCollection) => {
    return {
      ...d,
      _created_at: d._created_at
        ? HACK_FIELD_VALUES.timestamp(new Date(d._created_at))
        : HACK_FIELD_VALUES.serverTimestamp(),
      _updated_at: HACK_FIELD_VALUES.serverTimestamp(),
    } as ISharedDataCollectionFirestore;
  },
};

/**
 * WiP
 * Attempt to recreate methods from firebase web provider using @capacitor-firebase
 * to use native layer for data operations
 *
 * This should offer some performance improvements, and removes the need for custom
 * workaround to sync auth from native to web layers when making requests on web
 * but signing in on native
 *
 * TODO
 * As of writing capacitor-firebase/firestore does not support some specific sentinel and
 * utility data types, such as `fieldDelete`, `Timestamp` and `serverTimestamp`.
 * If trying to sync data that uses timestamps, sync will fail as Timestamp cannot be
 * serialized across native bridge. If using Date objects instead dates will be
 * converted to isoString (data is stringified, calling toJSON methods), and therefore
 * be incompatible with data synced as timestamps (mix of string and timestamp dates on server)
 *
 * This incompatibility needs to be solved before a single unified adapter can be used
 * for both native and web. Potentially via:
 * https://github.com/capawesome-team/capacitor-firebase/pull/677
 *
 * - [ ] Wait for update that includes support for `fieldDelete` `Timestamp`
 * and `serverTimestamp()` data types
 * - [ ] Refactor methods to use correct data types
 * - [ ] Confirm behaviour same as web
 */
export class FirebaseNativeDataProvider implements SharedDataProviderBase {
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
      data: sharedDataConverter.toFirestore(data),
    });
    return data;
  }

  public updateSharedData(id: string, key: string, value: any) {
    const docRef = `${COLLECTION}/${id}`;
    const valueToSet = value === undefined ? "deleteField" : value;

    // remove nested data entry
    // HACK - not supported on native so set entire document without
    if (value === undefined) {
      if (Capacitor.isNativePlatform()) {
        return this.hackHandleNativeDeleteField(docRef, key);
      } else {
        value = deleteFieldWeb();
      }
    }

    return FirebaseFirestore.updateDocument({
      reference: docRef,
      data: {
        [`data.${key}`]: valueToSet,
        _updated_at: HACK_FIELD_VALUES.serverTimestamp(),
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
        _updated_at: HACK_FIELD_VALUES.serverTimestamp(),
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
        data: { ...snapshot.data, _updated_at: HACK_FIELD_VALUES.serverTimestamp() },
        merge: false,
      });
    }
  }

  private buildFilterConstraints(params: SharedDataQueryParams): QueryFieldFilterConstraint[] {
    const { since, auth_id } = params;
    const constraints: QueryFieldFilterConstraint[] = [];

    if (since) {
      // convert isoString date to firestore timestamp for comparison
      const queryDate = HACK_FIELD_VALUES.timestamp(new Date(since));
      constraints.push(whereTyped("_updated_at", ">", queryDate));
    }

    constraints.push(whereTyped("members", "array-contains", auth_id));
    return constraints;
  }

  private collectionToObservable(
    options: AddCollectionSnapshotListenerOptions
  ): Observable<ISharedDataCollection[]> {
    return new Observable<ISharedDataCollection[]>((observer) => {
      let callbackId: CallbackId;

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
                const items = event.snapshots.map((doc) =>
                  sharedDataConverter.fromFirestore(doc.data)
                );
                console.log("items received", items);
                observer.next(items);
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
      };
    });
  }

  private documentToObservable(path: string): Observable<ISharedDataCollection> {
    return new Observable<ISharedDataCollection>((observer) => {
      let callbackId: CallbackId;

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
                const item = sharedDataConverter.fromFirestore(event.snapshot.data);
                observer.next(item);
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
      };
    });
  }
}
