import { NgModule } from "@angular/core";
import { PreloadAllModules, Route, RouterModule, Routes } from "@angular/router";
import { APP_CONSTANTS } from "./data";
import { TourComponent } from "./feature/tour/tour.component";

const { APP_ROUTE_DEFAULTS } = APP_CONSTANTS;

/** Routes specified from data-models */
const DataRoutes: Routes = [
  { path: "", redirectTo: APP_ROUTE_DEFAULTS.home_route, pathMatch: "full" },
  ...APP_ROUTE_DEFAULTS.redirects,
];
const fallbackRoute: Route = { path: "**", redirectTo: APP_ROUTE_DEFAULTS.fallback_route };

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
    path: "theme",
    loadChildren: () => import("./feature/theme/theme.module").then((m) => m.ThemeModule),
  },
  {
    path: "tour",
    loadChildren: () => import("./feature/tour/tour.module").then((m) => m.TourModule),
  },
  {
    path: "tour/:tourName",
    component: TourComponent,
  },
  {
    path: "feedback",
    loadChildren: () => import("./feature/feedback/feedback.module").then((m) => m.FeedbackModule),
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
