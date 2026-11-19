import { Routes } from "@angular/router";

/** Debug page listing all templates and data lists, e.g. `/debug` */
export const DEBUG_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/debug.page").then((m) => m.DebugPage),
  },
];
