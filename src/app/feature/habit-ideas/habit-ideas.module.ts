import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitIdeasPageRoutingModule } from './habit-ideas-routing.module';

import { HabitIdeasPage } from './habit-ideas.page';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitIdeasPageRoutingModule,
    DragDropModule
  ],
  declarations: [HabitIdeasPage]
})
export class HabitIdeasPageModule {}
