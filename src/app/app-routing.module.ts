import { NgModule } from "@angular/core";
import { PreloadAllModules, Route, RouterModule, Routes } from "@angular/router";
import { APP_ROUTE_DEFAULTS } from "packages/data-models/constants";
import { ThemeEditorComponent } from "src/app/feature/theme/theme-editor/theme-editor.component";
import { TourComponent } from "./feature/tour/tour.component";

/** Routes specified from data-models */
const DataRoutes: Routes = [
  { path: "", redirectTo: APP_ROUTE_DEFAULTS.home_path, pathMatch: "full" },
  ...APP_ROUTE_DEFAULTS.redirects,
];
const fallbackRoute: Route = { path: "**", redirectTo: APP_ROUTE_DEFAULTS.fallback_path };

/** Routes required for main app features */
const FeatureRoutes: Routes = [
  {
    path: "campaigns",
    loadChildren: () => import("./feature/campaign/campaign.module").then((m) => m.CampaignModule),
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./feature/notification/notification.module").then((m) => m.NotificationsModule),
  },
  {
    path: "template",
    loadChildren: () =>
      import("./feature/template/template.module").then((m) => m.TemplatePageModule),
  },
  {
    path: "theme-editor",
    component: ThemeEditorComponent,
  },
  {
    path: "tour",
    component: TourComponent,
  },
  {
    path: "tour/:tourName",
    component: TourComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...FeatureRoutes, ...DataRoutes, fallbackRoute], {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
