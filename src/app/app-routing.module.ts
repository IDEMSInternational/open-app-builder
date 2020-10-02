import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { StressedMultiHandAnimComponent } from "./shared/components/stressed-multi-hand-anim/stressed-multi-hand-anim.component";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./feature/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "activities",
    loadChildren: () =>
      import("./feature/activities/activities.module").then(
        (m) => m.ActivitiesPageModule
      ),
  },
  {
    path: "songs",
    loadChildren: () =>
      import("./feature/songs/songs.module").then((m) => m.SongsPageModule),
  },
  {
    path: "goals",
    loadChildren: () =>
      import("./feature/goals/goals.module").then((m) => m.GoalsPageModule),
  },
  {
    path: "stories",
    loadChildren: () =>
      import("./feature/stories/stories.module").then(
        (m) => m.StoriesPageModule
      ),
  },
  {
    path: "take-a-pause",
    loadChildren: () =>
      import("./feature/take-a-pause/take-a-pause.module").then(
        (m) => m.TakeAPausePageModule
      ),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./feature/about/about.module").then((m) => m.AboutPageModule),
  },
  {
    path: "family",
    loadChildren: () =>
      import("./feature/family/family.module").then((m) => m.FamilyPageModule),
  },
  {
    // http://localhost:4200/#/stressed-hands-anim
    path: "stressed-hands-anim",
    component: StressedMultiHandAnimComponent,
  },
  {
    path: "chat",
    loadChildren: () =>
      import("./feature/chat/chat.module").then((m) => m.ChatPageModule),
  },
  {
    path: "toolbox",
    loadChildren: () =>
      import("./feature/toolbox/toolbox.module").then(
        (m) => m.ToolboxPageModule
      ),
  },
  {
    path: "gallery",
    loadChildren: () =>
      import("./feature/gallery/gallery.module").then(
        (m) => m.GalleryPageModule
      ),
  },
  {
    path: "calendar",
    loadChildren: () =>
      import("./feature/calendar/calendar.module").then(
        (m) => m.CalendarPageModule
      ),
  },
  {
    path: "privacy",
    loadChildren: () =>
      import("./feature/privacy/privacy.module").then(
        (m) => m.PrivacyPageModule
      ),
  },
  {
    path: "app-terms",
    loadChildren: () =>
      import("./feature/app-terms/app-terms.module").then(
        (m) => m.AppTermsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
