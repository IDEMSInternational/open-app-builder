import { IRemoteFunctionProvider } from "../remote-function.types";
import { RemoteFunctionProviderBase } from "./base";
import { FirebaseFunctionProvider } from "./firebase";

// TODO - optimise for production (only include provider used)
export const getFunctionProvider = (name: IRemoteFunctionProvider): RemoteFunctionProviderBase => {
  switch (name) {
    case "firebase":
      return new FirebaseFunctionProvider();
    default:
      console.warn("[Remote Function] no provider configured for: ", name);
      return new RemoteFunctionProviderBase();
  }
};
