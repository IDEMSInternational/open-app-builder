import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongPlayerPage } from './song-player.page';

const routes: Routes = [
  {
    path: '',
    component: SongPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongPlayerPageRoutingModule {}
