import { Injector } from "@angular/core";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { SharedDataProviderBase, SharedDataQueryParams } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { Observable } from "rxjs";
import { ISharedDataCollection } from "../types";
import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotMetadata,
} from "firebase/firestore";

/** Prefix applied to all firebase collections for storing shared data */
const COLLECTION = `shared_data`;

/** Convert data between app and firestore formats */
const dataConverter: FirestoreDataConverter<ISharedDataCollection, DocumentData> = {
  toFirestore: (data) => ({
    ...data,
    _created_at: data._created_at || new Date().toISOString(),
    _updated_at: new Date().toISOString(),
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    return {
      ...data,
      _created_at: data._created_at,
      _updated_at: data._updated_at,
    } as ISharedDataCollection;
  },
};

/**
 * Shared data provider that wraps Firebase Firestore for data sharing
 *
 * Table data is represented within firestore collections prefixed via `shared_`
 */
export class FirebaseDataProvider implements SharedDataProviderBase {
  public async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    firebaseService.ready();

    const app = firebaseService.app;
    if (!app) {
      throw new Error(`Shared data provider required firebase to be configured`);
    }
  }

  public querySingle$(params: SharedDataQueryParams): Observable<ISharedDataCollection> {
    const { id } = params;
    return new Observable<ISharedDataCollection>((observer) => {
      let callbackId: string;
      const setupListener = async () => {
        callbackId = await FirebaseFirestore.addDocumentSnapshotListener(
          {
            reference: `${COLLECTION}/${id}`,
          },
          (result, error) => {
            if (error) {
              observer.error(error);
              return;
            }
            if (result?.snapshot) {
              // Create a QueryDocumentSnapshot-like object that matches the converter's expectations
              const snapshot = {
                data: () => result.snapshot.data,
                id: result.snapshot.id,
                exists: true,
                ref: { id: result.snapshot.id },
                get: () => result.snapshot.data,
                metadata: {
                  fromCache: false,
                  hasPendingWrites: false,
                } as SnapshotMetadata,
              } as unknown as QueryDocumentSnapshot<DocumentData>;
              const data = dataConverter.fromFirestore(snapshot);
              observer.next({ id: result.snapshot.id, ...data });
            }
          }
        );
      };
      setupListener();
      return () => {
        if (callbackId) {
          FirebaseFirestore.removeSnapshotListener({ callbackId });
        }
      };
    });
  }

  public queryMultiple$(params: SharedDataQueryParams): Observable<ISharedDataCollection[]> {
    const { since, auth_id } = params;
    const queryConstraints = [];

    if (since) {
      queryConstraints.push({
        type: "where",
        fieldPath: "_updated_at",
        opStr: ">",
        value: new Date(since).toISOString(),
      });
    }
    queryConstraints.push({
      type: "where",
      fieldPath: "members",
      opStr: "array-contains",
      value: auth_id,
    });

    return new Observable<ISharedDataCollection[]>((observer) => {
      let callbackId: string;
      const setupListener = async () => {
        callbackId = await FirebaseFirestore.addCollectionSnapshotListener(
          {
            reference: COLLECTION,
            compositeFilter: {
              type: "and",
              queryConstraints,
            },
          },
          (result, error) => {
            if (error) {
              observer.error(error);
              return;
            }
            if (result?.snapshots) {
              const items = result.snapshots.map((snapshot) => {
                // Create a QueryDocumentSnapshot-like object that matches the converter's expectations
                const querySnapshot = {
                  data: () => snapshot.data,
                  id: snapshot.id,
                  exists: true,
                  ref: { id: snapshot.id },
                  get: () => snapshot.data,
                  metadata: {
                    fromCache: false,
                    hasPendingWrites: false,
                  } as SnapshotMetadata,
                } as unknown as QueryDocumentSnapshot<DocumentData>;
                const data = dataConverter.fromFirestore(querySnapshot);
                return { id: snapshot.id, ...data };
              });
              observer.next(items);
            }
          }
        );
      };
      setupListener();
      return () => {
        if (callbackId) {
          FirebaseFirestore.removeSnapshotListener({ callbackId });
        }
      };
    });
  }

  public async createSharedCollection(id: string, data: ISharedDataCollection) {
    const convertedData = dataConverter.toFirestore(data);
    await FirebaseFirestore.setDocument({
      reference: `${COLLECTION}/${id}`,
      data: convertedData,
    });
    return data;
  }

  public async updateSharedData(id: string, key: string, value: any) {
    const updateData: any = { [`data.${key}`]: value };
    if (value === undefined) {
      updateData[`data.${key}`] = null;
    }
    await FirebaseFirestore.updateDocument({
      reference: `${COLLECTION}/${id}`,
      data: updateData,
    });
  }

  public async deleteSharedCollection(id: string) {
    await FirebaseFirestore.deleteDocument({
      reference: `${COLLECTION}/${id}`,
    });
  }

  public async updateCollectionMetadata(id: string, update: Partial<ISharedDataCollection>) {
    const convertedUpdate = dataConverter.toFirestore(update as ISharedDataCollection);
    await FirebaseFirestore.updateDocument({
      reference: `${COLLECTION}/${id}`,
      data: { ...convertedUpdate, _updated_at: new Date().toISOString() },
    });
  }
}
