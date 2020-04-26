import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'activities',
    loadChildren: () => import('./feature/activities/activities.module').then( m => m.ActivitiesPageModule)
  },
  {
    path: 'songs',
    loadChildren: () => import('./feature/songs/songs.module').then( m => m.SongsPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./feature/goals/goals.module').then( m => m.GoalsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
