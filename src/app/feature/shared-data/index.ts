import { inject, provideEnvironmentInitializer } from "@angular/core";
import { Routes } from "@angular/router";
import { SharedDataService } from "./shared-data.service";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { SharedDataActionFactory } from "./shared-data.actions";
import { makeEnvironmentProviders } from "@angular/core";

// Export the routes to allow debug route to be included in main app-routing.module
export const SHARED_DATA_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/debug/shared-data-debug.page").then((m) => m.SharedDataDebugPage),
  },
];

function registerActions() {
  const service = inject(SharedDataService);
  const templateActionRegistry = inject(TemplateActionRegistry);
  const { shared_data } = new SharedDataActionFactory(service);
  templateActionRegistry.register({ shared_data });
}

// use environment initializer to ensure init only called once (sync/non-blocking)
// if needing async logic an `provideAppInitializer` can be used instead
export function provideSharedData() {
  return makeEnvironmentProviders([
    SharedDataService,
    provideEnvironmentInitializer(() => {
      registerActions();
    }),
  ]);
}
