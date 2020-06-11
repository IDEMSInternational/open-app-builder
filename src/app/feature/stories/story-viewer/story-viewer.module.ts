import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoryViewerPageRoutingModule } from './story-viewer-routing.module';

import { StoryViewerPage } from './story-viewer.page';
import { ReflectAnimationComponent } from 'src/app/shared/components/reflect-animation/reflect-animation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoryViewerPageRoutingModule
  ],
  declarations: [StoryViewerPage, ReflectAnimationComponent]
})
export class StoryViewerPageModule {}
