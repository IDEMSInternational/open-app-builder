import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplateTestingPageRoutingModule } from './template-testing-routing.module';

import { TemplateTestingPage } from './template-testing.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplateComponentsModule } from 'src/app/shared/components/template/template.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplateTestingPageRoutingModule,
    TemplateComponentsModule
  ],
  declarations: [TemplateTestingPage]
})
export class TemplateTestingPageModule {}
