import { Injectable, Injector, ProviderToken } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TemplateInstanceService {
  constructor(public injector: Injector) {}

  getGlobalService<T>(token: ProviderToken<T>) {
    return this.injector.get(token);
  }
}
