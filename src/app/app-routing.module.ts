import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TourComponent } from "./feature/tour/tour.component";

/**
 * Routes required for main app features
 * Additional home template redirects and fallback routes will be specified
 * from deployment config via the AppConfigService
 **/
export const APP_FEATURE_ROUTES: Routes = [
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
    path: "user",
    loadChildren: () => import("./feature/user/user.module").then((m) => m.UserModule),
  },
  // Routes to show in sidebar routing
  {
    path: "feedback",
    loadChildren: () => import("./feature/feedback/feedback.module").then((m) => m.FeedbackModule),
    outlet: "sidebar",
  },
  {
    path: "template",
    loadChildren: () =>
      import("./feature/template/template.module").then((m) => m.TemplatePageModule),
    outlet: "sidebar",
  },
  {
    path: "component",
    loadChildren: () =>
      import("./feature/template/pages/component/component.module").then(
        (m) => m.TemplateComponentModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_FEATURE_ROUTES, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
