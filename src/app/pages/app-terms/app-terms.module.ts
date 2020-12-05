import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppTermsPageRoutingModule } from './app-terms-routing.module';

import { AppTermsPage } from './app-terms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppTermsPageRoutingModule
  ],
  declarations: [AppTermsPage]
})
export class AppTermsPageModule {}
