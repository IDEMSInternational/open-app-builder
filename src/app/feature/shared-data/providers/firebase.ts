import { Injector } from "@angular/core";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  orderBy,
  Query,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { SharedDataProviderBase, SharedDataQueryParams } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { Observable, map } from "rxjs";
import { ISharedDataCollection } from "../types";

/** Prefix applied to all firebase collections for storing shared data */
const COLLECTION = `shared_data`;

// Data stored in firestore replaces ISOString timestamps with Firestore Timestamps
type ISharedDataCollectionFirestore = Omit<ISharedDataCollection, "_created_at" | "_updated_at"> & {
  _created_at: Timestamp;
  _updated_at: Timestamp;
};

// Utility to provide type-safety on where clause queries
function whereTyped(fieldPath: keyof ISharedDataCollection, opStr: WhereFilterOp, value: unknown) {
  return where(fieldPath, opStr, value);
}

/** Convert timestamps stored locally (isoString) and on firestore (Timestamp) */
const sharedDataConverter: FirestoreDataConverter<
  ISharedDataCollection,
  ISharedDataCollectionFirestore
> = {
  fromFirestore: (snapshot) => {
    const d = snapshot.data() as ISharedDataCollectionFirestore;
    return {
      ...d,
      _created_at: d._created_at.toDate().toISOString(),
      _updated_at: d._updated_at.toDate().toISOString(),
    };
  },

  toFirestore: (d: ISharedDataCollection) => ({
    ...d,
    _created_at: d._created_at ? Timestamp.fromDate(new Date(d._created_at)) : serverTimestamp(),
    _updated_at: serverTimestamp(),
  }),
};

/**
 * Shared data provider that wraps Firebase Firestore for data sharing
 *
 * Table data is represented within firestore collections prefixed via `shared_`
 */
export class FirebaseDataProvider extends SharedDataProviderBase {
  private db: Firestore;

  public override async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    firebaseService.ready();

    const app = firebaseService.app;
    if (!app) {
      throw new Error(`Shared data provider required firebase to be configured`);
    }
    this.db = getFirestore(app);
  }

  public override queryMultiple$(params: SharedDataQueryParams) {
    // TODO - track if existing subscriptions already exist to avoid recreating (at top-level)

    const { id = "" } = params;
    const collectionPath = id ? `${COLLECTION}/${id}` : COLLECTION;
    const collectionRef = collection(this.db, collectionPath).withConverter(sharedDataConverter);

    // Retrieve docs where public true or use included
    const docsQuery = this.buildDocumentQuery(collectionRef, params);

    // const privateDocs = query(collectionRef, where());
    return this.queryToObservable<ISharedDataCollection>(docsQuery);
  }

  public override async create(id: string, data: ISharedDataCollection) {
    const docRef = doc(this.db, COLLECTION, id);
    const res = await getDocFromServer(docRef);
    if (res.exists()) {
      throw new Error(`[Shared Data] id already exists: ${id}`);
    }
    return setDoc(docRef, data);
  }

  public override set(id: string, data: ISharedDataCollection["data"]) {
    const docRef = doc(this.db, COLLECTION, id);
    return updateDoc(docRef, "data", data, { _updated_at: serverTimestamp() });
  }

  private buildDocumentQuery(
    collectionRef: CollectionReference<ISharedDataCollection, ISharedDataCollectionFirestore>,
    params: SharedDataQueryParams
  ) {
    const { since } = params;

    if (since) {
      // convert isoString date to firestore timestamp for comparison
      const queryDate = Timestamp.fromDate(new Date(since));

      // optimise query to filter _updated_at first as likely will have fewer results
      return query(
        collectionRef,
        whereTyped("_updated_at", ">", queryDate),
        whereTyped("isPublic", "==", true),
        orderBy("_updated_at")
      );
    } else {
      return query(collectionRef, whereTyped("isPublic", "==", true));
    }
  }

  /** Convert a firestore query to observable for eaiser subscription management */
  private queryToObservable<T>(q: Query<DocumentData, DocumentData>): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      try {
        // Set up the snapshot listener
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
            observer.next(items);
          },
          (error) => {
            observer.error(error);
          }
        );

        // Return the unsubscribe function to clean up when this Observable is unsubscribed
        return unsubscribe;
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
