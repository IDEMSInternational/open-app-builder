import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ThemeEditorComponent } from "src/app/feature/theme/theme-editor/theme-editor.component";
import { StressedMultiHandAnimComponent } from "./shared/components/stressed-multi-hand-anim/stressed-multi-hand-anim.component";

const FeatureRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () => import("./feature/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "take-a-pause",
    loadChildren: () =>
      import("./feature/take-a-pause/take-a-pause.module").then((m) => m.TakeAPausePageModule),
  },
  {
    path: "chat",
    loadChildren: () => import("./feature/chat/chat.module").then((m) => m.ChatPageModule),
  },
  {
    path: "toolbox",
    loadChildren: () => import("./feature/toolbox/toolbox.module").then((m) => m.ToolboxPageModule),
  },
  {
    path: "gallery",
    loadChildren: () => import("./feature/gallery/gallery.module").then((m) => m.GalleryPageModule),
  },
  {
    path: "goals",
    loadChildren: () => import("./feature/goals/goals.module").then((m) => m.GoalsPageModule),
  },
  {
    path: "theme-editor",
    component: ThemeEditorComponent,
  },
];
/** 2020-11-23 - Deprecated but may use in future (still included in app) */
const DeprecatedRoutes: Routes = [
  {
    path: "family",
    loadChildren: () => import("./feature/family/family.module").then((m) => m.FamilyPageModule),
  },
  {
    path: "calendar",
    loadChildren: () =>
      import("./feature/calendar/calendar.module").then((m) => m.CalendarPageModule),
  },
  {
    path: "stressed-hands-anim",
    component: StressedMultiHandAnimComponent,
  },
];
/** Hardcoded pages, not linked to any feature modules */
const StaticPages: Routes = [
  {
    path: "about",
    loadChildren: () => import("./feature/about/about.module").then((m) => m.AboutPageModule),
  },
  {
    path: "privacy",
    loadChildren: () => import("./feature/privacy/privacy.module").then((m) => m.PrivacyPageModule),
  },
  {
    path: "app-terms",
    loadChildren: () =>
      import("./feature/app-terms/app-terms.module").then((m) => m.AppTermsPageModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./feature/settings/settings.module").then((m) => m.SettingsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...StaticPages, ...FeatureRoutes, ...DeprecatedRoutes], {
    preloadingStrategy: PreloadAllModules,
    useHash: false,
    anchorScrolling: "enabled",
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
