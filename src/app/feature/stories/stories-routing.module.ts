import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoriesPage } from './stories.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage
  },
  {
    path: 'story/:id',
    loadChildren: () => import('./story-viewer/story-viewer.module').then( m => m.StoryViewerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesPageRoutingModule {}
