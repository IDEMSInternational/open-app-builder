import { Routes } from "@angular/router";

/**
 * Pages to view data lists from app_data, e.g. `/data_list/image_list`.
 * Without a name, lists all data lists
 */
export const DATA_LIST_ROUTES: Routes = [
  {
    path: ":dataListName",
    loadComponent: () => import("./pages/data-list.page").then((m) => m.DataListPage),
  },
  {
    path: "",
    loadComponent: () => import("./pages/data-list.page").then((m) => m.DataListPage),
  },
];
