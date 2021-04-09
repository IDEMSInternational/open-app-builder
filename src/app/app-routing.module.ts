import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ThemeEditorComponent } from "src/app/feature/theme/theme-editor/theme-editor.component";
import { ParentPointsPage } from "./feature/parent-points/parent-points.page";
import { TourComponent } from "./feature/tour/tour.component";

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
    path: "module_list",
    loadChildren: () =>
      import("./feature/module_list/module-list.module").then((m) => m.ModuleListModule),
  },
  {
    path: "module_page",
    loadChildren: () =>
      import("./feature/module_page/module-page.module").then((m) => m.ModulePageModule),
  },
  {
    path: "take-a-pause",
    loadChildren: () =>
      import("./feature/take-a-pause/take-a-pause.module").then((m) => m.TakeAPausePageModule),
  },
  {
    path: "conversation",
    loadChildren: () => import("./feature/chat/chat.module").then((m) => m.ChatPageModule),
  },

  {
    path: "tips",
    loadChildren: () => import("./feature/tips/tips.module").then((m) => m.TipsModule),
  },
  {
    path: "goals",
    loadChildren: () => import("./feature/goals/goals.module").then((m) => m.GoalsPageModule),
  },
  {
    path: "care-packages",
    loadChildren: () =>
      import("./feature/care-packages/care-packages.module").then((m) => m.CarePackagesPageModule),
  },
  {
    path: "habit_ideas",
    loadChildren: () =>
      import("./feature/habit-ideas/habit-ideas.module").then((m) => m.HabitIdeasPageModule),
  },
  {
    path: "reminders",
    loadChildren: () =>
      import("./feature/reminders/reminders.module").then((m) => m.RemindersModule),
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
  {
    path: "parent_points",
    loadChildren: () =>
      import("./feature/parent-points/parent-points.module").then((m) => m.ParentPointsPageModule),
  },
  {
    path: "animations",
    loadChildren: () =>
      import("./feature/animations/animations.module").then((m) => m.AnimationsPageModule),
  },
  /*****************************************************************************************
   * Legacy paths - these should be removed in the future once modules refactored
   * (duplicated above via 'conversation' and 'tips' flow type handlers)
   ****************************************************************************************/
  {
    path: "chat",
    loadChildren: () => import("./feature/chat/chat.module").then((m) => m.ChatPageModule),
  },
  {
    path: "toolbox/topic/:topicId",
    loadChildren: () => import("./feature/tips/tips.module").then((m) => m.TipsModule),
  },
  {
    path: "template",
    loadChildren: () =>
      import("./feature/template-testing/template-testing.module").then(
        (m) => m.TemplateTestingPageModule
      ),
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
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then((m) => m.SettingsPageModule),
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
