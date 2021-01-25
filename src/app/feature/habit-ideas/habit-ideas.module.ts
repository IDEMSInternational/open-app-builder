import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitIdeasPageRoutingModule } from './habit-ideas-routing.module';

import { HabitIdeasPage } from './habit-ideas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitIdeasPageRoutingModule
  ],
  declarations: [HabitIdeasPage]
})
export class HabitIdeasPageModule {}
