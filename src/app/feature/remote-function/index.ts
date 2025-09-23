import { inject } from "@angular/core";
import { Routes } from "@angular/router";
import { RemoteFunctionService } from "./remote-function.service";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { RemoteFunctionActionFactory } from "./remote-function.actions";
import { ENVIRONMENT_INITIALIZER, makeEnvironmentProviders } from "@angular/core";

// Export the routes to allow debug route to be included in main app-routing.module
export const REMOTE_FUNCTION_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/debug/remote-function-debug.page").then((m) => m.RemoteFunctionDebugPage),
  },
];

// Use initializer to register actions used within global templates
export function initialiseRemoteFunctions() {
  return () => {
    const service = inject(RemoteFunctionService);
    const templateActionRegistry = inject(TemplateActionRegistry);
    const { remote_function } = new RemoteFunctionActionFactory(service);
    templateActionRegistry.register({ remote_function });
  };
}

// use environment initializer to ensure init only called once (sync/non-blocking)
// if needing async logic an APP_INITIALIZER can be used instead
export function provideRemoteFunctions() {
  return makeEnvironmentProviders([
    RemoteFunctionService,
    { provide: ENVIRONMENT_INITIALIZER, useFactory: initialiseRemoteFunctions, multi: true },
  ]);
}
