import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolboxTopicPageRoutingModule } from './toolbox-topic-routing.module';

import { ToolboxTopicPage } from './toolbox-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolboxTopicPageRoutingModule
  ],
  declarations: [ToolboxTopicPage]
})
export class ToolboxTopicPageModule {}
