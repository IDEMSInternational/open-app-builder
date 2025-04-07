import { ISharedDataProvider } from "../types";

import { SharedDataProviderBase } from "./base";
import { FirebaseDataProvider } from "./firebase";

// TODO - optimise for production (only include provider used)
export const getDataProvider = (name: ISharedDataProvider): SharedDataProviderBase => {
  switch (name) {
    case "firebase":
      return new FirebaseDataProvider();
    default:
      console.warn("[Auth Provider] not configured for: ", name);
      return new SharedDataProviderBase();
  }
};
