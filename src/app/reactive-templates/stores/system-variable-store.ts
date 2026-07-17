import { Injectable } from "@angular/core";
import { GlobalVariableStore } from "./global-variable-store";

/**
 * A reactive store for system variables.
 */
@Injectable({
  providedIn: "root",
})
export class SystemVariableStore extends GlobalVariableStore {
  protected storageKeyPrefix: string = "system-";
}
