import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HOME_SCREEN_TEMPLATE } from "data-models/constants";
import { ThemeEditorComponent } from "src/app/feature/theme/theme-editor/theme-editor.component";
import { TourComponent } from "./feature/tour/tour.component";

const FeatureRoutes: Routes = [
  {
    path: "",
    redirectTo: `/template/${HOME_SCREEN_TEMPLATE}`,
    pathMatch: "full",
  },
  {
    path: "home",
    redirectTo: `/template/${HOME_SCREEN_TEMPLATE}`,
    pathMatch: "full",
  },
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

/** Hardcoded pages, not linked to any feature modules */
const StaticPages: Routes = [
  {
    path: "about",
    loadChildren: () => import("./pages/about/about.module").then((m) => m.AboutPageModule),
  },
  {
    path: "privacy",
    loadChildren: () => import("./pages/privacy/privacy.module").then((m) => m.PrivacyPageModule),
  },
  {
    path: "app-terms",
    loadChildren: () =>
      import("./pages/app-terms/app-terms.module").then((m) => m.AppTermsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...StaticPages, ...FeatureRoutes], {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
