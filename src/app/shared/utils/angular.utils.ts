import { NavigationEnd } from "@angular/router";
import type { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { filter, map, startWith } from "rxjs";

/**
 * When accessing ActivatedRoute from a provider router hierarchy includes all routers, not just
 * current view router (as identified when using from within a component)
 *
 * Workaround to check all nested routers for params and combined. Adapted from:
 * https://medium.com/simars/ngrx-router-store-reduce-select-route-params-6baff607dd9
 */
function mergeRouterSnapshots(router: Router) {
  const merged: Partial<ActivatedRouteSnapshot> = { data: {}, params: {}, queryParams: {} };
  let route: ActivatedRoute | undefined = router.routerState.root;
  while (route !== undefined) {
    const { data, params, queryParams } = route.snapshot;
    merged.data = { ...merged.data, ...data };
    merged.params = { ...merged.params, ...params };
    merged.queryParams = { ...merged.queryParams, ...queryParams };
    route = route.children.find((child) => child.outlet === "primary");
  }
  return merged as ActivatedRouteSnapshot;
}

/**
 * Subscribe to snapshot across all active routers
 * This may be useful in cases where a service wants to subscribe to route parameter changes
 * (default behaviour would only detect changes to top-most route)
 * Adapted from https://github.com/angular/angular/issues/46891#issuecomment-1190590046
 */
export function ngRouterMergedSnapshot$(router: Router) {
  return router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map(() => mergeRouterSnapshots(router)),
    startWith(mergeRouterSnapshots(router))
  );
}

/**
 * Utility function to return the active pathname without any sidebar routing e.g. /home(sidebar:alt)
 * or basename when deployed to subfolder path, e.g. /my-repo/template/home (provided by <base href='' /> in head)
 * */
export const activeRoute = (location: Location) => {
  const baseHref = document.querySelector("base")?.getAttribute("href");
  const path = location.pathname.replace(baseHref, "/").replace(/\(.+\)/, "");
  return path;
};
