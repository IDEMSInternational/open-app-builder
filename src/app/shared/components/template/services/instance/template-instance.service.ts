import { Injectable, Injector, ProviderToken } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TemplateInstanceService {
  constructor(public injector: Injector) {}

  getGlobalService<T>(token: ProviderToken<T>) {
    const service = this.injector.get(token);
    if (!service) {
      console.warn("Global service requested but not found", token);
    }
    return service;
  }
}
