import { Injector } from "@angular/core";

export interface RemoteFunctionInvokeParams {
  /** Payload sent to function */
  [key: string]: string;
}

export class RemoteFunctionProviderBase {
  public async initialise(injector: Injector) {}

  public async invoke(functionName: string, params: RemoteFunctionInvokeParams) {
    console.error(`[Remote Function] Provider method not implemented: invoke`);
    return;
  }
}
