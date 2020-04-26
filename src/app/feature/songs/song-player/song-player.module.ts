import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongPlayerPageRoutingModule } from './song-player-routing.module';

import { SongPlayerPage } from './song-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongPlayerPageRoutingModule
  ],
  declarations: [SongPlayerPage]
})
export class SongPlayerPageModule {}
