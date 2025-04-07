import { Injector } from "@angular/core";
import { doc, Firestore, getFirestore, setDoc } from "firebase/firestore";
import { SharedDataProviderBase } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";

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

  public override set(_list_id: string, _id: string, data: any) {
    const docRef = doc(this.db, `shared_${_list_id}`, _id);
    return setDoc(docRef, data, { merge: true });
  }
}
