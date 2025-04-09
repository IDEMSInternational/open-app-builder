import { Injector } from "@angular/core";
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
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
} from "firebase/firestore";
import { SharedDataProviderBase, SharedDataQueryParams } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { Observable, map } from "rxjs";
import { ISharedDataItem } from "../types";

/** Prefix applied to all firebase collections for storing shared data */
const COLLECTION = `shared_data`;

// Data stored in firestore replaces ISOString timestamps with Firestore Timestamps
type ISharedDataItemFirestore = Omit<ISharedDataItem, "_created_at" | "_updated_at"> & {
  _created_at: Timestamp;
  _updated_at: Timestamp;
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
    const { id = "", since = "" } = params;
    const collectionPath = id ? `${COLLECTION}/${id}` : COLLECTION;
    const collectionRef = collection(this.db, collectionPath);

    // convert isoString datevalue to firestore timestamp for comparison
    const queryDate = since ? Timestamp.fromDate(new Date(since)) : undefined;

    // Retrieve docs where public true or use included
    const publicDocs = query(
      collectionRef,
      // where("_updated_at", ">", queryDate),
      where("public", "==", true),
      orderBy("_updated_at")
    );

    // const privateDocs = query(collectionRef, where());
    return this.queryToObservable<ISharedDataItemFirestore>(publicDocs).pipe(
      map((docs) =>
        docs.map((d) => {
          // convert firestore timestamps back to isostring
          const item: ISharedDataItem = {
            ...d,
            _created_at: d._created_at.toDate().toISOString(),
            _updated_at: d._updated_at.toDate().toISOString(),
          };
          return item;
        })
      )
    );
  }

  public override async create(id: string, data: ISharedDataItem) {
    const docRef = doc(this.db, COLLECTION, id);
    const { exists } = await getDoc(docRef);
    if (exists()) {
      throw new Error(`[Shared Data] id already exists: ${id}`);
    }
    // TODO - check auth user exists - should also fail security rules

    // replace timestamp metadata with firebase server timestamps for improved querying
    return setDoc(docRef, { ...data, _created_at: serverTimestamp, _updated_at: serverTimestamp });
  }

  public override set(id: string, data: ISharedDataItem["data"]) {
    const docRef = doc(this.db, COLLECTION, id);
    return updateDoc(docRef, "data", data, { _updated_at: serverTimestamp });
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
