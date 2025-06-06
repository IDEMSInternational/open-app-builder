import { Injector } from "@angular/core";
import { Observable } from "rxjs";
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

/** Prefix applied to all firebase collections for storing shared data */
const COLLECTION = `shared_data`;

// The Capacitor plugin returns Timestamps as objects with seconds and nanoseconds.
type CapacitorTimestamp = {
  seconds: number;
  nanoseconds: number;
};

// Helper to convert the Capacitor/Firestore Timestamp object to an ISO string.
function timestampToISO(timestamp: CapacitorTimestamp | undefined): string | undefined {
  if (!timestamp) {
    return undefined;
  }
  return new Date(timestamp.seconds * 1000).toISOString();
}

/**
 * MANUAL DATA CONVERSION
 * The Capacitor plugin does not have a `withConverter` utility. We handle the
 * data transformation manually after reading from Firestore.
 */
function fromFirestore(id: string, data: Record<string, any>): ISharedDataCollection {
  return {
    ...data,
    id, // The plugin separates the id from the data, so we add it back.
    _created_at: timestampToISO(data._created_at),
    _updated_at: timestampToISO(data._updated_at),
  } as ISharedDataCollection;
}

/**
 * Shared data provider that wraps the UNIFIED @capacitor-firebase/firestore plugin.
 * Table data is represented within firestore collections prefixed via `shared_`
 */
export class FirebaseDataProvider implements SharedDataProviderBase {
  public async initialise(injector: Injector): Promise<void> {
    const firebaseService = injector.get(FirebaseService);
    await firebaseService.ready();
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

  public async createSharedCollection(
    id: string,
    data: ISharedDataCollection
  ): Promise<ISharedDataCollection> {
    const docPath = `${COLLECTION}/${id}`;
    const dataToSet: DocumentData = {
      ...data,
      _created_at: "serverTimestamp",
      _updated_at: "serverTimestamp",
    };
    delete dataToSet.id;

    await FirebaseFirestore.setDocument({
      reference: docPath,
      data: dataToSet,
    });
    return data;
  }

  public updateSharedData(id: string, key: string, value: any): Promise<void> {
    const docPath = `${COLLECTION}/${id}`;
    const valueToSet = value === undefined ? "deleteField" : value;

    return FirebaseFirestore.updateDocument({
      reference: docPath,
      data: {
        [`data.${key}`]: valueToSet,
        _updated_at: "serverTimestamp",
      },
    });
  }

  public deleteSharedCollection(id: string): Promise<void> {
    const docPath = `${COLLECTION}/${id}`;
    return FirebaseFirestore.deleteDocument({ reference: docPath });
  }

  public updateCollectionMetadata(
    id: string,
    update: Partial<ISharedDataCollection>
  ): Promise<void> {
    const docPath = `${COLLECTION}/${id}`;
    return FirebaseFirestore.updateDocument({
      reference: docPath,
      data: {
        ...update,
        _updated_at: "serverTimestamp",
      },
    });
  }

  private buildFilterConstraints(params: SharedDataQueryParams): QueryFieldFilterConstraint[] {
    const { since, auth_id } = params;
    const constraints: QueryFieldFilterConstraint[] = [];

    if (since) {
      constraints.push({
        type: "where",
        fieldPath: "_updated_at",
        opStr: ">",
        value: new Date(since),
      });
    }

    constraints.push({
      type: "where",
      fieldPath: "members",
      opStr: "array-contains",
      value: auth_id,
    });

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
                const items = event.snapshots.map((doc) => fromFirestore(doc.id, doc.data));
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
                const item = fromFirestore(event.snapshot.id, event.snapshot.data);
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
