import { Router, Routes } from "@angular/router";
import { IAppConfig } from "packages/data-models";
import { APP_FEATURE_ROUTES } from "src/app/app-routing.module";

/**
 * Update app routing to include redirects, home and fallback routes specified in config
 */
export const updateRoutingDefaults = (config: IAppConfig["APP_ROUTE_DEFAULTS"], router: Router) => {
  const routes: Routes = [
    ...APP_FEATURE_ROUTES,
    ...config.redirects,
    { path: "", redirectTo: config.home_route, pathMatch: "full" },
    { path: "**", redirectTo: config.fallback_route },
  ];

  return router.resetConfig(routes);
};
