import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsPage } from './songs.page';

const routes: Routes = [
  {
    path: '',
    component: SongsPage
  },
  {
    path: 'song/:id',
    loadChildren: () => import('./song-player/song-player.module').then( m => m.SongPlayerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsPageRoutingModule {}
