import { Injector, ProviderToken } from "@angular/core";
import type { AsyncServiceBase } from "./asyncService.base";
import type { SyncServiceBase } from "./syncService.base";

/**
 * Utility method to return globally defined service from injector (with additional logging)
 * @Note it is recommended checking the injected service is ready
 * */
export function getGlobalService<T extends AsyncServiceBase | SyncServiceBase>(
  injector: Injector,
  token: ProviderToken<T>
) {
  const service = injector.get(token);
  if (!service) {
    throw new Error("Global service requested but not found");
  }
  if (!service.isReady()) {
    console.warn("Service injected but not ready", token);
  }
  return service;
}

/** Utility method to call ready method on global service, used to ensure services ready when injecting dynamically */
export function readyGlobalService<T extends AsyncServiceBase>(
  injector: Injector,
  token: ProviderToken<T>
) {
  const service = injector.get(token);
  if (!service) {
    throw new Error("Global service requested but not found");
  }
  return service.ready();
}
